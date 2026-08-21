import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "matrix-calculator",
  name: "Matrix Mathematics & Determinant Calculator",
  category: "Number",
  shortDescription: "Perform 2x2, 3x3, and 4x4 matrix Addition, Subtraction, Multiplication, Determinant, Transpose, and Inverse calculations.",
  heroTitle: "Matrix Mathematics & Determinant Calculator",
  heroDescription: "Perform 2x2, 3x3, and 4x4 matrix Addition, Subtraction, Multiplication, Determinant, Transpose, and Inverse calculations.",
  about: "The Matrix Mathematics Calculator performs linear algebra calculations on 2x2, 3x3, and 4x4 square matrices with instant determinant, matrix transposition, inversion, and matrix multiplication.",
  features: [
    "Supports 2x2, 3x3, and 4x4 matrix sizes",
    "Calculates Matrix Addition (A + B), Subtraction (A - B), and Multiplication (A × B)",
    "Calculates Determinant det(A), Transpose Aᵀ, and Inverse A⁻¹",
    "Step-by-step determinant expansion"
],
  howToUse: [
    "Select matrix dimension (2x2, 3x3, or 4x4).",
    "Enter the scalar values for Matrix A and Matrix B.",
    "Select the desired operation (A + B, A × B, det(A), Aᵀ, Inverse).",
    "View the resulting output matrix."
],
  whyUse: [
    "Compute 3D graphics transformation matrices (rotation, translation, projection).",
    "Solve systems of linear equations in physics and engineering.",
    "Verify machine learning linear algebra calculations."
],
  tips: [
    "A matrix has an Inverse A⁻¹ if and only if its Determinant is non-zero (det(A) ≠ 0)."
],
  faqs: [
  {
    "question": "When does a matrix have an inverse?",
    "answer": "A square matrix has an inverse if and only if its determinant is non-zero (det(A) ≠ 0). Matrices with zero determinants are called singular."
  },
  {
    "question": "Is matrix multiplication commutative (A × B = B × A)?",
    "answer": "No, matrix multiplication is generally non-commutative; A × B is almost never equal to B × A."
  }
]
};
