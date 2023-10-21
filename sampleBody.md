## To list a new restaurant

```
{
  "restaurantDetails": {
    "name": "Bhawna Foods",
    "email": "bhawna@example.com",
    "phone": "1234567890",
    "description": "A place to enjoy authentic Indian delicacies",
    "avgRating": 4.5,
    "img": "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "avgDeliveryTime": 25
  },
  "menus": [
    {
      "name": "Breakfast",
      "category": "veg",
      "avgRating": 3.2,
      "items": [
        {
          "name": "Food Item 1",
          "price": 30
        }
      ]
    }
  ]
}
```

## To update a restaurant

```
{
  "restaurantId": 1,
  "updates": {
    "name": "Maa Ki Rasoi"
  }
}
```

## To add food items to existing menu by menu name

```
{
  "menuName": "Delicious Menu",
  "menuCategory": "veg",
  "menuAvgRating": 4.5,
  "menuItems": [
    {
      "name": "Pasta",
      "price": 10.99
    },
    {
      "name": "Pizza",
      "price": 12.99
    },
    {
      "name": "Burger",
      "price": 8.99
    }
  ]
}
```

## To add food item to existing menu by menu id

```
{
  "menuName": "Delicious Menu",
  "menuCategory": "veg",
  "menuAvgRating": 4.5,
  "menuItems": [
    {
      "name": "Pasta",
      "price": 10.99
    },
    {
      "name": "Pizza",
      "price": 12.99
    },
    {
      "name": "Burger",
      "price": 8.99
    }
  ]
}

```

## To add a new menu with food items

```
{
  "menuName": "Vegetarian Menu",
  "foodItemData": {
    "name": "Veggie Burger",
    "price": 8.99
  }
}
```

## To signup

```
{
  "email": "example@example.com",
  "phone": "1234567890",
  "password": "yourpassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

## To sign in

```
{
  "email": "example@example.com",
  "password": "yourpassword"
}
```

## To change password

```
{
  "userId": "2e38f963-3687-4c9f-977c-ebed17f838f4",
  "password": "yourpassword",
  "newPassword": "yourNewPassword"
}
```

## To forgot password

```
{
  "email": "example@example.com",
  "newPassword": "yourNewPassword"
}
```

## To update user

```
{
  "firstName": "John",
  "lastName": "Doe"
}

```

## Some test users

```
{
  "email": "admin@example.com",
  "phone": "1234567890",
  "password": "yourNewPassword",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "store"
  <!--userid: 8655a32e-967c-4c2a-aa14-4164e98df32f -->
},
{
  "email": "example@example.com",
  "phone": "1234567890",
  "password": "yourpassword",
  "firstName": "John",
  "lastName": "Doe",
  <!--userid: 3c765110-48fd-4f87-bfaa-3f75c56af571 -->
},
{
  "email": "test@example.com",
  "phone": "1234567890",
  "password": "yourpassword",
  "firstName": "John",
  "lastName": "Doe",
  <!--userid: fc267836-5883-4fe3-99ce-1de964731961 -->
}
```

## ngrok link

```
 https://99d8-182-68-50-56.ngrok-free.app -> http://localhost:3000
```
