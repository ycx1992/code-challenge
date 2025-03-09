// Use looping to calculate the sum of numbers from 1 to n
function sum_to_n_a(n: number): number {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// Construct of array of numbers then use map reduce to calculate the sum
function sum_to_n_b(n: number): number {
  let n_arr = Array.from({ length: n }, (_, i) => i + 1);
  return n_arr.reduce((acc, curr) => acc + curr, 0);
}

// Use math formula to calculate the sum of numbers from 1 to n
function sum_to_n_c(n: number): number {
  return (n * (n + 1)) / 2;
}
