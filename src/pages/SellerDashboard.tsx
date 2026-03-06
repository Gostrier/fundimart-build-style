import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, LogOut, Store, MapPin, Mail, Phone } from "lucide-react";
import { ProductForm } from "@/components/ProductForm";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/product";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isSeller } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not a seller
  useEffect(() => {
    if (!isSeller()) {
      navigate("/auth");
    }
  }, [isSeller, navigate]);

  // Load products from localStorage
  useEffect(() => {
    if (user?.id) {
      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const sellerProducts = allProducts.filter((p: Product) => p.sellerId === user.id);
      setProducts(sellerProducts);
    }
  }, [user]);

  const handleAddProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newProduct: Product = {
        ...data,
        id: `product_${Date.now()}`,
        sellerId: user?.id || "",
        sellerName: `${user?.firstName} ${user?.lastName}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      allProducts.push(newProduct);
      localStorage.setItem("fundimart_products", JSON.stringify(allProducts));

      setProducts([...products, newProduct]);
      setIsAddingProduct(false);

      // Show success message
      alert("Product added successfully!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
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

      setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)));
      setEditingProduct(null);

      alert("Product updated successfully!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProductId) return;

    setIsLoading(true);
    try {
      const allProducts = JSON.parse(localStorage.getItem("fundimart_products") || "[]");
      const filtered = allProducts.filter((p: Product) => p.id !== deletingProductId);
      localStorage.setItem("fundimart_products", JSON.stringify(filtered));

      setProducts(products.filter((p) => p.id !== deletingProductId));
      setDeletingProductId(null);

      alert("Product deleted successfully!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border py-6 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your products and store</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Store Information Card */}
        {user?.seller && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Store Name</p>
                    <p className="text-lg font-semibold">{user.seller.hardwareName}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.seller.location}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.seller.firmEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Your Products</h2>
              <p className="text-muted-foreground mt-1">{products.length} product(s) listed</p>
            </div>
            <Button onClick={() => setIsAddingProduct(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground mb-4">No products yet. Start by adding your first product!</p>
                <Button onClick={() => setIsAddingProduct(true)} className="flex items-center gap-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  {product.photos.length > 0 && (
                    <div className="h-48 bg-muted overflow-hidden">
                      <img
                        src={product.photos[0]}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  <CardContent className="flex-1 flex flex-col pt-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>

                    {product.quality && (
                      <p className="text-sm text-muted-foreground mb-2">Quality: {product.quality}</p>
                    )}

                    <p className="text-2xl font-bold text-primary mb-2">KES {product.price.toLocaleString()}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Stock</p>
                        <p className="font-semibold">{product.stock} units</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Photos</p>
                        <p className="font-semibold">{product.photos.length} image(s)</p>
                      </div>
                    </div>

                    {product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 flex items-center gap-2"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 flex items-center gap-2"
                        onClick={() => setDeletingProductId(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details for your new product
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleAddProduct} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for your product
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm initialData={editingProduct} onSubmit={handleUpdateProduct} isLoading={isLoading} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingProductId} onOpenChange={() => setDeletingProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SellerDashboard;
