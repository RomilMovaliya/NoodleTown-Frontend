import { Box, Button, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import {
  addItemToCartApi,
  decrementQuantityApi,
  incrementQuantityApi,
} from "../../store/cartSlice";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getOrderOnlineData } from "../../utils/orderonline";
import { fetchCartItems } from "../../utils/cartItem";
import { CartItemPayload } from "../../types/type";

const OrderOnline = () => {

  const mapToCartPayload = (item: AllItems, user_id: string): CartItemPayload => ({
    id: 0,
    item_id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    quantity: 1,
    user_id,
  });

  const { id } = useParams<{ id: string }>();


  const {
    data: items = [],
    refetch,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });

  const cartItems = items.cartItems || [];

  const userId = items.user?.userId;

  interface AllItems {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
  }

  const { data: itemsData, isLoading: isItemsLoading } = useQuery({
    queryKey: ["itemsData"],
    queryFn: getOrderOnlineData
  })
  const allItems: { [key: number]: AllItems[] } = {
    1: itemsData || [],
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(""); // Default category

  const handleListItemClick = (index: number, category: string) => {
    setSelectedIndex(index);
    setSelectedCategory(category); // Set the selected category based on click
  };

  interface RecommendedItems {
    id: number;
    name: string;
    category: string;
  }

  const recommendedItems: { [key: number]: RecommendedItems[] } = {
    1: [
      { id: 1, name: "Recommended", category: `Lapino'z Recommended` },
      { id: 2, name: "Pizzas (2)", category: "Pizzas" },
      {
        id: 3,
        name: "Classic Pizzas For Classic Maniacs (1)",
        category: "classic Pizzas",
      },
      { id: 4, name: "Lasagna (3)", category: "Lasagna" },
      { id: 5, name: "Sides (3)", category: "Sides" },
      { id: 6, name: "Desserts (5)", category: "Desserts" },
    ],

    2: [
      { id: 1, name: "Recommended", category: `McDonald's Recommended` },
      { id: 2, name: "Burgers (5)", category: "Burgers" },
      {
        id: 3,
        name: "Cakes Brownies and Cookies (4)",
        category: "Cakes Brownies and Cookies",
      },
      { id: 4, name: "Fries (2)", category: "Fries" },
      { id: 5, name: "Chicken Nuggets (3)", category: "Chicken Nuggets" },
      { id: 6, name: "Desserts (1)", category: "Desserts" },
    ],
    3: [
      { id: 1, name: "Recommended", category: `Starbuck's Recommended` },
      { id: 2, name: "Hot Coffee (1)", category: "HotCoffee" },
      { id: 3, name: "Cold Brew (1)", category: "ColdBrew" },
      { id: 4, name: "Bakery (1)", category: "Bakery" },
      { id: 5, name: "Refreshers (1)", category: "Refreshers" },
      { id: 6, name: "Frappuccino (1)", category: "Frappuccino" },
    ],

    4: [
      { id: 1, name: "Recommended", category: `BurgerKing Recommended` },
      { id: 2, name: "Cheeseburger (5)", category: "Burgers" },
      { id: 3, name: "Fries (2)", category: "Fries" },
      { id: 4, name: "Coffee (4)", category: "Coffee" },
      { id: 5, name: "Beverages (4)", category: "Beverages" },
    ],

    5: [
      { id: 1, name: "Recommended", category: `KFC Recommended` },
      { id: 2, name: "Veggie Pizza", category: "Pizzas" },
      { id: 3, name: "Snacks", category: "KFCChicken" },
      {
        id: 4,
        name: "Classic Pizzas For Classic Maniacs (10)",
        category: "Pizzas",
      },
      { id: 5, name: "Drinks", category: "Beverages" },
    ],
    6: [
      { id: 1, name: "Recommended", category: `CoffeeCulture Recommended` },
      { id: 2, name: "Cafe Sides", category: "Cafe Sides" },
      {
        id: 3,
        name: "Classic Pizzas For Classic Maniacs (10)",
        category: "Pizzas",
      },
      { id: 4, name: "Garlic Bread", category: "Garlic Bread" },
      { id: 5, name: "Ice Cream", category: "Desserts" },
    ],
  };

  const handleAddToCart = (item: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    user_id: string;
    item_id: number;

  }) => {
    if (!userId) {
      toast.error("Hey there! Please login to proceed.");
      return;
    }

    const itemsInCart = cartItems || [];
    const existingItem = itemsInCart.find(
      (cartItem: { item_id: number }) => cartItem.item_id === item.item_id
    );

    if (existingItem && existingItem.quantity >= 5) {
      toast.error("Maximum quantity of 5 reached for this item!");
    } else {
      addItemToCartApi(item, userId!)
        .then(() => {
          refetch();
        })
        .catch((error) => {
          console.error("Failed to add item to cart:", error);
        });
    }
  };

  const handleIncrement = (id: string) => {
    incrementQuantityApi(id)
      .then(() => refetch())
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

  const [allrecommendedItems, setAllRecommendedItems] = useState<
    RecommendedItems[]
  >([]);

  useEffect(() => {
    const brandId = parseInt(id || "0");
    if (recommendedItems[brandId]) {
      setAllRecommendedItems(recommendedItems[brandId]);
      // Set the default category after recommended items are loaded
      setSelectedCategory(recommendedItems[brandId][0].category);
    } else {
      setAllRecommendedItems([]);
    }


  }, [id]);

  // Filter the items based on selected category
  const filteredItems = Object.values(allItems)
    .flat()
    .filter((item) => item.category === selectedCategory);

  return (
    <>
      {isItemsLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "300px 3fr",
              marginBlock: 2,
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 6px 12px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={300}
              height={200}
              sx={{ borderRadius: 2 }}
            />
            <Box sx={{ paddingLeft: 2 }}>
              <Skeleton width="60%" height={30} />
              <Skeleton width="80%" height={20} sx={{ my: 1 }} />
              <Skeleton width="40%" height={20} />
              <Skeleton width="30%" height={36} sx={{ mt: 2 }} />
            </Box>
          </Box>
        ))) : (
        <Box
          sx={{
            marginInline: {
              lg: "160px",
              xs: "30px",
            },
            "@media (max-width:320px)": {
              flexDirection: "column",
              marginInline: "10px",
            },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              "@media (max-width:600px)": {
                flexDirection: "column",
                marginInline: "20px",
              },

              "@media (max-width:850px)": {
                flexDirection: "column",
                marginInline: "20px",
              },
            }}
            spacing={2}
            alignItems="flex-start"
          >
            <Box sx={{ maxWidth: 400, padding: 2, marginLeft: 0 }}>
              {allrecommendedItems.map((item, index) => (
                <Button
                  key={index}
                  // selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index, item.category)}
                  sx={{
                    minWidth: {
                      xs: 200,
                      lg: 300,
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    backgroundColor:
                      selectedIndex === index ? "#FFC300" : "transparent",
                    color: selectedIndex === index ? "black" : "inherit",
                  }}
                >
                  <ListItemText primary={item.name} />
                </Button>
              ))}
            </Box>

            {/* Vertical line */}
            <Box
              sx={{
                height: "500px",
                width: "2px",
                backgroundColor: "#FFC300",
                marginTop: 3,
                marginBottom: 20,

                "@media (max-width:850px)": {
                  height: "0px",
                  width: "0px",
                },
              }}
            />

            <Stack>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: 2,
                  fontWeight: "bold",
                  marginLeft: {
                    xs: "20px",
                    lg: "30px",
                  },

                  "@media (max-width:600px)": {
                    marginLeft: "0px",
                  },
                }}
              >
                {selectedCategory.split(" ").slice(1).join(" ")}{" "}
                {/* Display the selected category */}
              </Typography>

              {/* Recommended content */}
              <Box
                marginTop="10px"
                marginInline="70px"
                sx={{ "@media (max-width:1090px)": { marginInline: "10px" } }}
              >
                {filteredItems.map((item) => {
                  console.log("filteredItems", filteredItems)
                  console.log("items", item.id);

                  //const cartItem = items.find((cart: any) => cart.name === item.name);
                  const cartItem = cartItems.find((cart: any) => cart.name === item.name);

                  console.log("cartItem jojo", cartItem);
                  console.log("cartItem.name", cartItem?.name);
                  console.log(item.name);
                  const isItemInCart = !!cartItem;

                  const ItemQuantity = {
                    quantity: cartItem?.quantity ?? 0,
                    cartitem_id: cartItem?.cartitem_id ?? '',
                  };

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "300px 3fr", // Horizontal layout for larger screens

                        "@media (max-width: 1206px)": {
                          gridTemplateColumns: "300px 3fr", // Horizontal layout for larger screens
                        },

                        "@media (max-width: 830px)": {
                          gridTemplateRows: "170px 3fr", // Adjust the rows layout for smaller screens
                          padding: "10px",
                          marginBlock: 0,
                        },
                        "@media (max-width: 780px)": {
                          gridTemplateRows: "170px 3fr",
                        },
                        "@media (max-width: 700px)": {
                          gridTemplateColumns: "1fr", // Change to vertical layout (single column)
                          gridTemplateRows: "auto", // Auto-adjust rows for vertical layout
                          padding: "20px",
                        },
                        "@media (max-width: 600px)": {
                          gridTemplateColumns: "1fr", // Change to vertical layout (single column)
                          gridTemplateRows: "auto", // Auto-adjust rows for vertical layout
                          padding: "20px",
                        },
                        marginBlock: 2,
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0 6px 12px 1px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Box
                        component="img"
                        padding={2}
                        src={item.image}
                        sx={{
                          // border: '2px solid black',
                          borderRadius: "10px",
                          height: { sm: "150px", md: "190px", lg: "200px" },
                          width: { sm: "150px", md: "190px", lg: "300px" },
                          "@media (max-width:830px)": {
                            display: "flex",
                            width: "200px",
                            marginInline: "30px",
                            justifyContent: "center",
                          },

                          "@media (max-width:829px)": {
                            display: "flex",
                            width: "150px",
                            marginInline: "20px",
                            justifyContent: "center",
                          },

                          "@media (max-width:780px)": {
                            display: "flex",
                            width: "150px",
                            marginInline: "5px",
                            justifyContent: "center",
                          },
                        }}
                        borderRadius={4}
                      />
                      <Stack sx={{ width: "100%", margin: { md: 2, sm: 1 } }}>
                        <Typography>{item.name}</Typography>
                        <Typography
                          sx={{
                            marginTop: { md: 2, sm: 1, lg: 2 },
                            fontSize: { lg: 20, md: 15, sm: 12 },
                            color: "#848484",
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { md: "20px", sm: "20px" },
                            marginTop: { md: 1, sm: 1, lg: 2 },
                          }}
                        >
                          ₹{item.price}
                        </Typography>

                        <Box width="100%">

                          {!isItemInCart ? (
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#FFA500",
                                color: "white",
                                width: "100%",
                              }}
                              onClick={() => handleAddToCart(mapToCartPayload(item, userId))}
                              disabled={ItemQuantity.quantity === 5} // Disable button if item quantity is 5
                            >
                              Add To Cart
                            </Button>
                          ) : (
                            <Stack direction="row" spacing={1}>
                              <Button
                                sx={{
                                  fontWeight: "700",
                                  backgroundColor: "#F3F3F3",
                                  color: "black",
                                }}
                                onClick={
                                  () => handleDecrement(ItemQuantity.cartitem_id, ItemQuantity.quantity)
                                }
                              >
                                -
                              </Button>
                              <Typography sx={{ alignContent: "center" }}>
                                {ItemQuantity.quantity}
                              </Typography>
                              <Button
                                sx={{
                                  backgroundColor: "#FFA500",
                                  color: "white",
                                }}
                                onClick={() =>
                                  handleIncrement(ItemQuantity.cartitem_id)
                                }
                                disabled={ItemQuantity.quantity === 5}
                              >
                                +
                              </Button>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}

    </>
  );
};

export default OrderOnline;
