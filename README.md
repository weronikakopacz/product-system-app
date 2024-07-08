# Product Storage App

The project consists of frontend and backend applications written in TypeScript. Its goal is to create a system for managing products, comments, and product categories, with user authentication and role-based access control.

## Features

- **Product Management:**
  - Adding, deleting (soft delete using isDeleted flag), editing, and listing products (with server-side pagination and filtering).
- **Product Comments:**
  - Adding, deleting, editing, and listing comments associated with products.
- **User Authentication:**
  - User login and registration using JWT tokens.
- **User Roles:**
  - Admin and regular user roles. Admins have access to all features, while regular users have limited access.
- **User Management:**
  - Admins can edit user details and assign roles.
- **Product Categories:**
  - Adding, deleting, editing, and listing product categories.
- **Filtering by Category:**
  - Selecting a category from a dropdown to filter products.

## Database Structure (Firestore)

- **products**
  - `categoryIds`: list of category IDs to which the product belongs
  - `creationDate`: date when the product was created
  - `creatorUserId`: ID of the user who created the product
  - `description`: product description
  - `imageUrl`: url to a pthoto of the product
  - `isDeleted`: indicates whether the product has been removed
  - `title`: product title
- **comments**
  - `creatorUserId`: ID of the user who created the comment
  - `description`: comment description
  - `productId`: ID of the product to which the comment belongs
  - `isDeleted`: indicates whether the comment has been removed
  - `creationDate`: date when the comment was created
- **categories**
  - `isDeleted`:  indicates whether the category has been removed
  - `name`: category name
- **users**
  - `email`: user email
  - `role`: role of the user (admin/user).
