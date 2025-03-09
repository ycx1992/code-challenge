-- Create the ComputerSales table
CREATE TABLE IF NOT EXISTS computer_sales (
  id INTEGER PRIMARY KEY,
  contact TEXT,
  gender TEXT,
  age INTEGER,
  state TEXT,
  product_code TEXT,
  product_type TEXT,
  price REAL,
  profit REAL,
  lead TEXT,
  month TEXT,
  year INTEGER,
  valid BOOLEAN DEFAULT TRUE
);
