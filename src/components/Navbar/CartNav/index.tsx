'use client';

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/hooks/useCartStore"
import { ShoppingCart, Trash2 } from "lucide-react"
 
export function CartSheet() {

  const cart = useCartStore((state) => state.cart)
  const totalAmount = useCartStore((state) => state.totalAmount)
  const removeArticle = useCartStore((state) => state.removeArticle)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative h-8 w-8 rounded-full">
            <ShoppingCart size={24} />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">{cart.length}</div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrito</SheetTitle>
          <SheetDescription>
            Carrito de compras
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {cart.map((article) => (
            <div key={article.id} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{article.code}</h3>
                <p className="text-sm text-muted-foreground">{article.quantity} x {article.price}</p>
              </div>
              <Button variant='outline' onClick={() => removeArticle(article)}><Trash2 className=" text-red-600"/></Button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Total</h3>
          <p className="text-lg font-bold">{totalAmount}</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}