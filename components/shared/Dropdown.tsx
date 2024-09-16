import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = async () => {
    try {
      // Create the new category
      const category = await createCategory({
        categoryName: newCategory.trim(),
      });

      // Only add if category has both _id and name
      if (category?._id && category?.name) {
        setCategories((prevState) => [...prevState, category]);
        setNewCategory(''); // Clear the input
      } else {
        console.error("Error: Category creation returned invalid data");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        if (categoryList) {
          setCategories(categoryList as ICategory[]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 ? (
          categories.map((category) =>
            category?._id && category?.name ? (
              <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                {category.name}
              </SelectItem>
            ) : null
          )
        ) : (
          <p>No categories available</p>
        )}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Add a New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
