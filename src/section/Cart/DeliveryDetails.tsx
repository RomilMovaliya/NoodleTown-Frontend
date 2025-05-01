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
    user_id: ""
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
        user_id: userId
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
        user_id: selected.user_id || "",
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

    localStorage.setItem("deliveryForm", JSON.stringify(form));
    await makePayment(userId, "orderId", price);

    setLoading(false);
  }

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
