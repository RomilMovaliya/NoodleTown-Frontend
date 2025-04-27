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

const DeliveryDetails = ({ open, onClose }) => {
  const userId = Cookies.get("userId");

  const navigate = useNavigate();

  // Fetch addresses from API
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

  // Reset on close
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
        phone: selected.phone || "", // Phone is not coming from saved address
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

    generateOrder(userId!).then((orderId) => {
      addOrderItem(userId!, orderId);
    });

    try {
      const response = await fetch("http://localhost:3001/api/delivery/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Submitted data:", data);

      onClose(); // close the dialog
      navigate("/order"); // navigate to order page

    } catch (error) {
      console.error("Error submitting delivery details:", error);
    }
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
    </Dialog>
  );
};

export default DeliveryDetails;
