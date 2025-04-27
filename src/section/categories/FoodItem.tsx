import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addItemToCartApi, incrementQuantityApi } from "../../store/cartSlice"; // Assuming you have an API call here
import { useQuery } from "@tanstack/react-query";
import { getFoodItemData } from "../../utils/foodItem";

interface FoodItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  overview: string;
  quantity: number;
}

const FoodItem = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(
    null
  );
  const [isCartItem, setIsCartItem] = useState<boolean>(false);
  const [cart, setCart] = useState<FoodItem[]>([]);
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const isLoggedIn = !!userId;

  const fetchCartItems = async () => {
    const response = await fetch(`http://localhost:3001/api/cart`);
    if (!response.ok) {
      throw new Error("Failed to fetch items from server cart");
    }
    const data = await response.json();

    for (const item of data) {
      console.log(
        "item's user id is same as userid from cookie",
        item.user_id === userId
      );

      if (item.user_id === userId) {
        if (item.name === selectedFoodItem?.name) {
          setIsCartItem(true);
          return;
        }
      }
    }

    console.log(cart);
    return data;
  };

  console.log("User ID from cookies:", userId);

  useEffect(() => {
    if (userId && selectedFoodItem) {
      fetchCartItems()
        .then((data) => {
          setCart(data);
          const existingItem = data.find(
            (item: FoodItem) =>
              item.user_id === userId && item.id === selectedFoodItem.id
          );
          if (existingItem) {
            setIsCartItem(true);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch cart items:", error);
        });
    }
  }, [userId, selectedFoodItem]); // Add selectedFoodItem as a dependency

  const { data: FoodItem } = useQuery({
    queryKey: ["foodItem"],
    queryFn: getFoodItemData
  })
  const foodItems: FoodItem[] = FoodItem?.data || [];





  useEffect(() => {
    const foodId = parseInt(id || "0");
    const food = foodItems.find((item) => item.id === foodId);
    setSelectedFoodItem(food || null);
  }, [id, foodItems]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add to cart.");
      return;
    }
    if (selectedFoodItem) {
      // Dispatching API call to save item to the cart.
      addItemToCartApi(selectedFoodItem, userId)
        .then(() => {
          dispatch({
            type: "ADD_ITEM_TO_CART_SUCCESS",
            payload: selectedFoodItem,
          });
          toast.success(`${selectedFoodItem.name} added to cart.`);

          setIsCartItem(true);
        })
        .catch((error) => {
          toast.error("Failed to add item to cart.");
          console.error("Failed to add item to cart:", error);
        });

      // Updating the local cart state
      setCart([...cart, selectedFoodItem]);
    }
  };

  const handleIncrement = (id: number, quantity: number) => {
    console.log("Incrementing quantity for item with ID:", id);
    incrementQuantityApi(id, quantity)
      .then(() => {
        dispatch({ type: "update item in cart", payload: id });
      })
      .catch((error) => {
        console.error("Failed to update item in cart:", error);
        toast.error("Failed to update item in your cart");
      });
  };

  const handleDecrement = () => {
    if (!selectedFoodItem) return;
    const existingItem = cart.find((item) => item.id === selectedFoodItem.id);
    if (!existingItem) return;
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== selectedFoodItem.id));
    } else {
      const updatedCart = cart.map((item) =>
        item.id === selectedFoodItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);
    }
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={3} mt={10} mx={3}>
      <Stack spacing={2}>
        {selectedFoodItem ? (
          <Box
            component="img"
            src={selectedFoodItem?.image}
            width="300px"
            height="300px"
          />
        ) : (
          <Skeleton
            variant="rounded"
            width={300}
            height={300}
            animation="wave"
          />
        )}


        {!selectedFoodItem ? (
          <Skeleton variant="rounded" width={200} height={40} animation="wave" />
        ) : !isCartItem ? (
          <Button variant="contained" color="warning" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" onClick={handleDecrement}>
              -
            </Button>
            <Typography>{selectedFoodItem?.quantity}</Typography>
            <Button
              variant="outlined"
              onClick={() =>
                handleIncrement(
                  selectedFoodItem?.id,
                  selectedFoodItem?.quantity + 1
                )
              }
            >
              +
            </Button>
          </Stack>

        )}

      </Stack>
      <Stack spacing={2}>

        {selectedFoodItem ? (
          <>
            <Typography variant="h4">{selectedFoodItem?.name}</Typography>
            <Typography variant="h6" color="text.secondary">
              Price: ₹{selectedFoodItem?.price}
            </Typography>
            <Typography>{selectedFoodItem?.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedFoodItem?.overview}
            </Typography>

          </>
        ) : (
          <>
            <Skeleton variant="text" width={200} height={40} animation="wave" />
            <Skeleton variant="text" width={150} animation="wave" />
            <Skeleton variant="text" width={300} animation="wave" />
            <Skeleton variant="rounded" width={350} height={100} animation="wave" />
          </>

        )}
      </Stack>
    </Stack>
  );
};

export default FoodItem;
