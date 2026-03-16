import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from '@/components/ProductForm';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Product } from '@/types/product';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
    setProducts(allProducts);
  }, []);

  const handleAddProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newProduct: Product = {
        ...data,
        id: `admin_prod_${Date.now()}`,
        sellerId: "admin",
        sellerName: "Fundimart Admin",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "active",
      };

      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      allProducts.push(newProduct);
      localStorage.setItem("fundimart_products", JSON.stringify(allProducts));

      setProducts([...products, newProduct]);
      setShowAddModal(false);
      alert("Product added successfully!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProduct) return;
    setIsLoading(true);
    try {
      const updatedProduct: Product = {
        ...editingProduct,
        ...data,
        updatedAt: Date.now(),
      };

      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const index = allProducts.findIndex((p: Product) => p.id === editingProduct.id);
      if (index !== -1) {
        allProducts[index] = updatedProduct;
        localStorage.setItem("fundimart_products", JSON.stringify(allProducts));
      }

      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setEditingProduct(null);
      alert("Product updated successfully!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const filtered = allProducts.filter((p: Product) => p.id !== id);
      localStorage.setItem("fundimart_products", JSON.stringify(filtered));
      setProducts(filtered);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Products Management</CardTitle>
          <p className="text-sm text-slate-400 mt-1">{products.length} total products</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus size={18} />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Name</TableHead>
                <TableHead className="text-slate-300">Category</TableHead>
                <TableHead className="text-slate-300">Price (KES)</TableHead>
                <TableHead className="text-slate-300">Stock</TableHead>
                <TableHead className="text-slate-300">Seller</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                    No products found in the database.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="border-slate-700">
                    <TableCell className="text-white font-medium">{product.name}</TableCell>
                    <TableCell className="text-slate-300">{product.category}</TableCell>
                    <TableCell className="text-slate-300">KES {product.price.toLocaleString()}</TableCell>
                    <TableCell className="text-slate-300">{product.stock} units</TableCell>
                    <TableCell className="text-slate-300">
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded-full">
                        {product.sellerName}
                      </span>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                        className="gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add Product Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New Product (Admin)</DialogTitle>
            <DialogDescription className="text-slate-400">
              Fill in the details for the new product to be listed on the website.
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update the details for this product.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm initialData={editingProduct} onSubmit={handleEditProduct} isLoading={isLoading} />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
