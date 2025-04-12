
import { useState } from "react";
import { Component } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Upload, X, ImagePlus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ComponentFormProps {
  component?: Component;
  onSubmit: (component: Omit<Component, "id">) => void;
  isEditing?: boolean;
}

const ComponentForm = ({
  component,
  onSubmit,
  isEditing = false
}: ComponentFormProps) => {
  const [name, setName] = useState(component?.name || "");
  const [totalQuantity, setTotalQuantity] = useState(component?.totalQuantity || 0);
  const [availableQuantity, setAvailableQuantity] = useState(
    component?.availableQuantity || 0
  );
  const [description, setDescription] = useState(component?.description || "");
  const [expectedRestock, setExpectedRestock] = useState<Date | undefined>(component?.expectedRestock);
  const [imagePreview, setImagePreview] = useState<string | undefined>(component?.imageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const removeImage = () => {
    setImagePreview(undefined);
    setImageFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would upload the image to a server and get a URL
    // For this demo, we'll just use the local preview URL
    onSubmit({
      name,
      totalQuantity,
      availableQuantity,
      description,
      expectedRestock,
      imageUrl: imagePreview
    });
    
    // Reset form if not editing
    if (!isEditing) {
      setName("");
      setTotalQuantity(0);
      setAvailableQuantity(0);
      setDescription("");
      setExpectedRestock(undefined);
      setImagePreview(undefined);
      setImageFile(null);
    }
  };

  return (
    <Card className="shadow-lg border-primary/10 bg-card/60 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-b from-primary/10 to-transparent rounded-t-lg">
        <CardTitle className="text-xl font-bold text-primary-foreground">
          {isEditing ? "Edit Component" : "Add New Component"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5 pt-5">
          {/* Image Upload Section */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="image" className="font-medium text-muted-foreground">
              Component Image
            </Label>
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <div className="relative w-full max-w-[200px] h-[150px] mb-3">
                  <img
                    src={imagePreview}
                    alt="Component Preview"
                    className="w-full h-full object-cover rounded-md border border-border"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeImage}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ) : (
                <div className="w-full max-w-[200px] h-[150px] border-2 border-dashed border-primary/30 rounded-md flex flex-col items-center justify-center mb-3 hover:border-primary/50 transition-colors">
                  <ImagePlus className="h-10 w-10 text-primary/50" />
                  <p className="text-sm text-muted-foreground mt-2">Upload component image</p>
                </div>
              )}
              <div className="flex items-center justify-center w-full">
                <Label 
                  htmlFor="image" 
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {imagePreview ? "Change Image" : "Upload Image"}
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name" className="font-medium text-muted-foreground">Component Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Arduino Uno"
              required
              className="bg-background/50 focus:bg-background transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="totalQuantity" className="font-medium text-muted-foreground">Total Quantity</Label>
              <Input
                id="totalQuantity"
                type="number"
                min="0"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(parseInt(e.target.value))}
                required
                className="bg-background/50 focus:bg-background transition-all"
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="availableQuantity" className="font-medium text-muted-foreground">Available Quantity</Label>
              <Input
                id="availableQuantity"
                type="number"
                min="0"
                max={totalQuantity}
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(parseInt(e.target.value))}
                required
                className="bg-background/50 focus:bg-background transition-all"
              />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="description" className="font-medium text-muted-foreground">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the component"
              rows={3}
              className="bg-background/50 focus:bg-background transition-all"
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label className="font-medium text-muted-foreground">Expected Restock Date (if out of stock)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background/50",
                    !expectedRestock && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expectedRestock ? format(expectedRestock, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expectedRestock}
                  onSelect={setExpectedRestock}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity">
            {isEditing ? "Update Component" : "Add Component"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ComponentForm;
