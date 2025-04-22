import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Slider,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  // State variables
  const [homeValue, setHomeValue] = useState(500000);  // Home value input
  const [downPayment, setDownPayment] = useState(100000);  // Down payment input
  const [loanAmount, setLoanAmount] = useState(100000);  // Final loan amount after down payment
  const [interestRate, setInterestRate] = useState(10);  // Interest rate
  const [tenure, setTenure] = useState(12);  // Tenure in months

  // Update loan amount after down payment
  const updateLoanAmount = () => {
    setLoanAmount(homeValue - downPayment);
  };

  // EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;

  // Chart data for loan distribution
  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["#1976d2", "#ef5350"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}> {/* Increased screen size */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          💸 Loan EMI Calculator
        </Typography>

        <Grid container spacing={2}>
          {/* Home Value and Down Payment Inputs using Slider */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Home Value: ₹{homeValue}</Typography>
            <Slider
              value={homeValue}
              min={100000}
              max={5000000}
              step={50000}
              onChange={(_, value) => setHomeValue(value)}
              onBlur={updateLoanAmount}  // Automatically update loan amount
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `₹${value}`}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Down Payment: ₹{downPayment}</Typography>
            <Slider
              value={downPayment}
              min={10000}
              max={5000000}
              step={10000}
              onChange={(_, value) => setDownPayment(value)}
              onBlur={updateLoanAmount}  // Automatically update loan amount
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `₹${value}`}
            />
          </Grid>

          {/* Loan Amount, Interest Rate, and Tenure Inputs using Slider */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Loan Amount: ₹{loanAmount}</Typography>
            <TextField
              label="Loan Amount"
              type="number"
              fullWidth
              value={loanAmount}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Annual Interest Rate: {interestRate}%</Typography>
            <Slider
              value={interestRate}
              min={1}
              max={20}
              step={0.1}
              onChange={(_, value) => setInterestRate(value)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Tenure (Months): {tenure}</Typography>
            <Slider
              value={tenure}
              min={6}
              max={360}
              step={1}
              onChange={(_, value) => setTenure(value)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} months`}
            />
          </Grid>

          {/* EMI Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Monthly EMI: ₹{emi.toFixed(2)}</Typography>
            <Typography variant="body1">
              Total Interest: ₹{totalInterest.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Total Payment: ₹{totalPayment.toFixed(2)}
            </Typography>
          </Grid>

          {/* Doughnut Chart for Loan Distribution */}
          <Grid item xs={12}>
            <Doughnut data={chartData} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
