import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { addItemToCartApi, decrementQuantityApi, incrementQuantityApi } from "../../store/cartSlice"; // Assuming you have an API call here
import { useQuery } from "@tanstack/react-query";
import { getFoodItemData } from "../../utils/foodItem";
import { fetchCartItems } from "../../utils/cartItem";

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

  const {
    data: items = [],
    refetch,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });

  const userId = items.user?.userId;
  const isLoggedIn = !!userId;



  const { data: FoodItem } = useQuery({
    queryKey: ["foodItem"],
    queryFn: getFoodItemData
  })
  const foodItems: FoodItem[] = FoodItem?.data || [];

  console.log("FoodItem data", foodItems);
  console.log("User ID from cookies:", userId);

  const cartItems = items.cartItems || [];
  const cartItem = cartItems.find((item: { item_id: number }) => item.item_id === selectedFoodItem?.id);

  const isItemInCart = !!cartItem;
  console.log("selectedFoodItem", selectedFoodItem);

  useEffect(() => {
    const foodId = parseInt(id || "0");
    const food = foodItems.find((item) => item.id === foodId);
    setSelectedFoodItem(food || null);
  }, [id, foodItems]);


  const handleAddToCart = (selectedFoodItem: FoodItem, userId: string) => {
    if (!isLoggedIn) {
      toast.error("Please login to add to cart.");
      return;
    }
    addItemToCartApi(selectedFoodItem, userId)
      .then(() => {
        refetch();
      })
      .catch((error) => {
        toast.error("Failed to add item to cart.");
        console.error("Failed to add item to cart:", error);
      });
  };


  const handleIncrement = (id: string) => {
    incrementQuantityApi(id)
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Failed to update item in cart:", error);
        toast.error("Failed to update item in your cart");
      });
  };

  const handleDecrement = (id: string, quantity: number) => {
    decrementQuantityApi(id, quantity)
      .then(() => refetch())
      .catch((error) => {
        console.error("Failed to update item in cart:", error);
        toast.error("Failed to update item in your cart");
      });
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
        ) : !isItemInCart ? (
          <Button variant="contained" color="warning" onClick={() => { handleAddToCart(selectedFoodItem, userId) }}>
            Add To Cart
          </Button>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" onClick={() => handleDecrement(cartItem.cartitem_id, cartItem.quantity)}>
              -
            </Button>
            <Typography>{cartItem?.quantity}</Typography>
            <Button
              variant="outlined"
              onClick={() =>
                handleIncrement(
                  cartItem?.cartitem_id
                )
              }
              disabled={cartItem?.quantity === 5}
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
