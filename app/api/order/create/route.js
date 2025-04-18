import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(request){
    try{

        const {userId} = getAuth(request)
        const {address, items} = await request.json()
        if(!address || items.length === 0){
            return NextResponse.json({success:false,message:"Please provide address and items"})
        }

        // calculate total price
        const amount = await items.reduce(async(acc, item)=>{
            const product = await Product.findById(item.product)
            return await acc + (product.offerPrice * item.quantity)
        },0)
        // order placed
        await inngest.send({
            name: 'order/created',
            data:{
                userId,
                address,
                items,
                // 2% tax added
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()
            }
        })

        // clear user cart
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()
        return NextResponse.json({success:true,message:"Order placed successfully"})


    }catch(error){
        return NextResponse.json({success:false,message:error.message})
    }
}