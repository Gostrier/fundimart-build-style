import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export default function AddProductModal({ onClose, onSubmit }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active' as const,
  });

  const handleSubmit = () => {
    // Validate inputs
    if (!formData.name.trim()) {
      alert("Please enter a product name");
      return;
    }
    if (!formData.category) {
      alert("Please select a category");
      return;
    }
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      alert("Please enter a valid price (must be greater than 0)");
      return;
    }
    const stock = parseInt(formData.stock);
    if (formData.stock === "" || isNaN(stock) || stock < 0) {
      alert("Please enter a valid stock quantity");
      return;
    }

    onSubmit({
      name: formData.name,
      category: formData.category,
      price,
      stock,
      status: formData.status,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Product</DialogTitle>
          <DialogDescription className="text-slate-400">
            Fill in the product details to add a new item to your catalog.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="name" className="text-slate-300">
              Product Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 bg-slate-700 border-slate-600 text-white"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-slate-300">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-slate-300">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 bg-slate-700 border-slate-600 text-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-slate-300">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="mt-1 bg-slate-700 border-slate-600 text-white"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status" className="text-slate-300">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' })}>
              <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
