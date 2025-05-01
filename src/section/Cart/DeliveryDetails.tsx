import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getAddress } from "../../utils/address";
import { addOrderItem, generateOrder } from "../../utils/cartItem";
import { useNavigate } from "react-router-dom";
import { makePayment } from "../orderView/PaymentSection";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Images/loadingAnimation.json";
import PaymentSuccess from "../orderView/PaymentSuccess";

interface DeliveryDetailsProps {
  open: boolean;
  onClose: () => void;
  price: number;
}


const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ open, onClose, price }) => {
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const { data: savedAddresses = [] } = useQuery({
    queryKey: ["address", userId],
    queryFn: () => getAddress(userId!),
    enabled: !!userId,
  });

  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!open) {
      setSelectedAddressId("");
      setForm({
        name: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        phone: "",
      });
    }
  }, [open]);

  const handleSelectChange = (e) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);

    const selected = savedAddresses.find((addr) => addr.id === addressId);
    if (selected) {
      setForm({
        name: selected.name || "",
        address: selected.address || "",
        city: selected.city || "",
        state: selected.state || "",
        pinCode: selected.pinCode || "",
        country: selected.country || "",
        phone: selected.phone || "",
      });
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      user_id: userId,
    };

    // console.log(PaymentSuccess);

    // try {
    //   const orderId = await generateOrder(userId);
    //   await addOrderItem(userId, orderId);

    //   const response = await fetch("http://localhost:3001/api/delivery/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   const data = await response.json();
    //   console.log("Submitted data:", data);

    //   console.log("price", price, orderId, userId);
    onClose();


    await makePayment(userId, "orderId", price);


    // } catch (error) {
    //   console.error("Error submitting delivery details:", error);
    // } finally {
    setLoading(false);
  }


  // return (
  //   <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
  //     <form onSubmit={handleSubmit}>
  //       <DialogTitle>
  //         <Typography variant="h5" fontWeight={600} color="#FFA500">
  //           Delivery Details
  //         </Typography>
  //       </DialogTitle>
  //       <Divider />

  //       <DialogContent sx={{ pt: 3 }}>
  //         {savedAddresses.length > 0 && (
  //           <Box mb={3}>
  //             <FormControl fullWidth>
  //               <InputLabel>Select Saved Address</InputLabel>
  //               <Select
  //                 value={selectedAddressId}
  //                 onChange={handleSelectChange}
  //                 label="Select Saved Address"
  //               >
  //                 {savedAddresses.map((addr) => (
  //                   <MenuItem key={addr.id} value={addr.id}>
  //                     {`${addr.name}, ${addr.address}, ${addr.city}`}
  //                   </MenuItem>
  //                 ))}
  //               </Select>
  //             </FormControl>
  //           </Box>
  //         )}

  //         <Grid container spacing={2}>
  //           <Grid item xs={12}>
  //             <TextField
  //               label="Full Name"
  //               name="name"
  //               value={form.name}
  //               onChange={handleChange}
  //               fullWidth
  //               required
  //             />
  //           </Grid>
  //           <Grid item xs={12}>
  //             <TextField
  //               label="Address"
  //               name="address"
  //               value={form.address}
  //               onChange={handleChange}
  //               fullWidth
  //               required
  //             />
  //           </Grid>
  //           <Grid item xs={6}>
  //             <TextField
  //               label="City"
  //               name="city"
  //               value={form.city}
  //               onChange={handleChange}
  //               fullWidth
  //               required
  //             />
  //           </Grid>
  //           <Grid item xs={6}>
  //             <TextField
  //               label="State"
  //               name="state"
  //               value={form.state}
  //               onChange={handleChange}
  //               fullWidth
  //               required
  //             />
  //           </Grid>
  //           <Grid item xs={6}>
  //             <TextField
  //               label="ZIP Code"
  //               name="pinCode"
  //               value={form.pinCode}
  //               onChange={handleChange}
  //               fullWidth
  //               required
  //             />
  //           </Grid>
  //           <Grid item xs={6}>
  //             <TextField
  //               label="Country"
  //               name="country"
  //               value={form.country}
  //               onChange={handleChange}
  //               fullWidth
  //               required
  //             />
  //           </Grid>
  //           <Grid item xs={12}>
  //             <TextField
  //               label="Phone Number"
  //               name="phone"
  //               value={form.phone}
  //               onChange={handleChange}
  //               fullWidth
  //               required
  //             />
  //           </Grid>
  //         </Grid>
  //       </DialogContent>

  //       <DialogActions sx={{ px: 3, pb: 3 }}>
  //         <Button onClick={onClose} variant="outlined" color="secondary">
  //           Cancel
  //         </Button>

  //         <Button
  //           type="submit"
  //           variant="contained"
  //           sx={{ backgroundColor: "#FFA500", color: "white" }}
  //         >
  //           Confirm Order
  //         </Button>
  //       </DialogActions>
  //     </form>

  //     <div
  //           style={{
  //               display: "flex",
  //               flexDirection: "column",
  //               justifyContent: "center",
  //               alignItems: "center",
  //               height: "100vh",
  //               textAlign: "center",
  //               backgroundColor: "#fff", // optional: gives a clean background
  //           }}
  //       >
  //           <Lottie
  //               animationData={loadingAnimation}
  //               loop={true}
  //               autoplay={true}
  //               style={{
  //                   width: 180,
  //                   height: 180,
  //               }}
  //           />
  //           <h2
  //               style={{
  //                   fontSize: "28px",
  //                   fontWeight: "600",
  //                   color: "#FF3B30", // red tone for error
  //                   marginTop: "20px",
  //                   fontFamily: "Poppins, sans-serif",
  //               }}
  //           >
  //               Payment Failed
  //           </h2>
  //           <p
  //               style={{
  //                   fontSize: "16px",
  //                   color: "#555",
  //                   marginTop: "10px",
  //                   fontFamily: "Poppins, sans-serif",
  //               }}
  //           >
  //               Redirecting to your cart shortly due to a payment issue.
  //           </p>
  //       </div>
  //   </Dialog>



  // );


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {loading ? (
        // Show this only when loading
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            textAlign: "center",
            padding: "40px 0",
          }}
        >
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: 150,
              height: 150,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontFamily: "Poppins, sans-serif",
              color: "#333",
            }}
          >
            Redirecting to payment...
          </Typography>
        </div>
      ) : (
        // Show form when not loading
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <Typography variant="h5" fontWeight={600} color="#FFA500">
              Delivery Details
            </Typography>
          </DialogTitle>
          <Divider />

          <DialogContent sx={{ pt: 3 }}>
            {savedAddresses.length > 0 && (
              <Box mb={3}>
                <FormControl fullWidth>
                  <InputLabel>Select Saved Address</InputLabel>
                  <Select
                    value={selectedAddressId}
                    onChange={handleSelectChange}
                    label="Select Saved Address"
                  >
                    {savedAddresses.map((addr) => (
                      <MenuItem key={addr.id} value={addr.id}>
                        {`${addr.name}, ${addr.address}, ${addr.city}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ZIP Code"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#FFA500", color: "white" }}
            >
              Confirm Order
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default DeliveryDetails;
