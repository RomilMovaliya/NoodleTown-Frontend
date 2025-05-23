
import {

  decrementQuantityApi,

  incrementQuantityApi,

  removeItemFromCartApi,
} from "../store/cartSlice";
import { toast } from "react-toastify";
import { Box, Button, Grid, Typography, TextField, Stack, Skeleton } from "@mui/material";
import Lottie from "lottie-react";
import emptyCartAnimation from "../assets/Images/EmptyBox.json";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQuery } from "@tanstack/react-query";
import DeliveryDetails from "../section/Cart/DeliveryDetails";
import { useState } from "react";
import { fetchCartItems } from "../utils/cartItem";

const CartItem = () => {

  const [openDialog, setOpenDialog] = useState(false);
  //const [cartItems, setCartItems] = useState<any[]>([]);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);


  const {
    data: items = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const cartData = await fetchCartItems();
  //       setCartItems(cartData.cartItems || []);
  //     } catch (error) {
  //       console.error("Failed to fetch cart items:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);




  console.log("cart items:", items);
  //console.log("setcartitem data", cartItems);


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

  const handleRemoveItem = (id: string) => {

    removeItemFromCartApi(id)
      .then(() => refetch())
      .catch((error) => {
        console.error("Failed to remove item from cart:", error);
        toast.error("Failed to remove item from your cart");
      });
  };



  if (isLoading) {
    return (
      <Grid container spacing={3} width="90%" m="auto" mt={{
        lg: 8,
        xs: 12,
        sm: 8,
        md: 8,
        xl: 8,
      }}>
        {[1, 2, 3].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={180} />
              <Skeleton variant="text" height={40} sx={{ mt: 2 }} />
              <Skeleton variant="text" height={30} width="60%" />
              <Skeleton variant="text" height={30} width="40%" />
              <Skeleton variant="rounded" height={50} sx={{ mt: 3 }} />
              <Skeleton variant="text" height={30} width="80%" sx={{ mt: 2 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }





  const cartItems = items?.cartItems || [];

  const totalPrice = cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  const userId = items.user.userId;
  console.log("userId", items.user.userId);
  return (
    <>
      <Stack direction={"row"} justifyContent="space-between">
        <Typography
          marginTop={
            {
              xs: "120px",
              sm: "100px",
              md: "100px",
              lg: "100px",
            }
          }
          marginInline={3}
          fontSize={30}
          fontWeight={600}
          fontFamily={"Poppins"}
        >
          Your Cart
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFA500",
            color: "white",
            marginTop: {
              xs: "120px",
              sm: "100px",
              md: "100px",
              lg: "100px",
            },
            marginInline: 3,
            paddingX: 3,
            borderRadius: 2,
          }}
          onClick={() => {
            if (!userId) {
              toast.error("Please log in to proceed to checkout.");
            } else {
              handleDialogOpen();
            }
          }}
        >
          <ShoppingCartIcon sx={{ marginRight: 1 }} />
          Go To Checkout
        </Button>


      </Stack>

      <DeliveryDetails price={totalPrice} open={openDialog} onClose={handleDialogClose} userId={userId} />

      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            fontWeight={500}
            fontFamily={"Poppins"}
            sx={{
              position: "absolute",
              zIndex: 2,
              fontSize: {
                xs: 20,
                sm: 25,
                lg: 30,
              },
              marginTop: {
                xs: 20,
                lg: 10,
              },
              "@media(max-width:420px)": {
                marginInline: 2,
                marginTop: 30,
              },
            }}
          >
            Oops! No items Found in the cart
          </Typography>
          <Lottie
            animationData={emptyCartAnimation}
            loop={false}
            autoplay
            style={{
              position: "absolute",
              zIndex: 0,
              marginTop: 500,
              height: "200px",
              width: "200px",
            }}
          />
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ marginBottom: 3 }}
          width="90%"
          m="auto"
        >
          {cartItems.map((item: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
              sx={{
                marginTop: {
                  xs: 5,
                  lg: 4,
                },
                "@media (max-width:600px)": {
                  marginTop: "20px",
                },
                "@media (max-width:400px)": {
                  marginTop: "10px",
                },
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.2)",
                  borderRadius: 2,
                  "@media (max-width:600px)": {
                    borderRadius: 4,
                  },
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 12px 4px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt="cart item"
                  sx={{
                    height: "auto",
                    width: "100%",
                    maxHeight: "280px",
                    objectFit: "cover",
                  }}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography fontSize={20} fontWeight={700}>
                    {item.name}
                  </Typography>
                  <Typography fontSize={25} fontWeight={700} color="#FFA500">
                    ₹{item.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  A Classic Cheesy Margharita. Can't Go Wrong.
                </Typography>

                <Box display="flex" justifyContent="space-between" mt={2}>
                  <TextField
                    sx={{
                      width: { xs: "100%", sm: "270px" },
                    }}
                    hiddenLabel
                    id={`filled-hidden-label-small-${item.id}`}
                    placeholder="Apply coupon code"
                    variant="filled"
                    size="small"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFA500",
                      width: "auto",
                      paddingX: 3,
                    }}
                  >
                    Apply
                  </Button>
                </Box>

                <Stack
                  direction={"row"}
                  margin={3}
                  marginInline={2}
                  spacing={1}
                >
                  <Button
                    onClick={() => handleDecrement(item.cartitem_id, item.quantity)}
                    sx={{ color: "black", fontSize: "20px" }}
                  >
                    -
                  </Button>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "30px",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <Button
                    onClick={() => handleIncrement(item.cartitem_id)}
                    sx={{
                      backgroundColor: "#FFA500",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    +
                  </Button>
                </Stack>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  marginInline={2}
                  marginBlock={1}
                >
                  <Typography color="#848484">Subtotal</Typography>
                  <Typography color="#FFC300" fontSize="20px" fontWeight={400}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: "#999999",
                    marginBlock: 2,
                  }}
                />

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  marginInline={2}
                  marginBlock={1}
                >
                  <Typography color="#848484">Total</Typography>
                  <Typography color="#FFC300" fontSize="20px" fontWeight={400}>
                    ₹{totalPrice}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#FFA500",
                    width: "90%",
                    marginInline: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                  onClick={() => handleRemoveItem(item.cartitem_id)}
                >
                  Remove from Cart
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default CartItem;
