# Nodepop Fundamentos

## OPTIONAL - create a npm package

- https://www.npmjs.com/package/stackoverlord-npm-package

## Deploy

### Install dependencies

```sh
npm install
```

### Configure

Copy .env.example to .env and review your config.

### Init database

**Only** on first deploy:

```sh
npm run initDB
```

## Start

To start a single instance:

```sh
npm start
```

To start in development mode:

```sh
npm run dev
```

## References

### UI fragments

- https://getbootstrap.com/docs/5.3/examples/
- https://getbootstrap.com/docs/5.3/examples/headers/
- https://getbootstrap.com/docs/5.3/forms/form-control/
- https://icons.getbootstrap.com/#install

## API

Base url: http://localhost:3000/api

### Product list

GET /api/products

``` json
{
  "result": [
    {
      "_id": "67895ebafad0445cbc354eab",
      "name": "Bicicleta",
      "owner": "67895ebafad0445cbc354ea5",
      "price": 23015,
      "image": "bici.jpg",
      "tags": [
        "lifestyle",
        "motor"
      ],
      "__v": 0
    },
    // ...
  ],
  "count
  ": 6
}
```

### Get one product by id

GET /api/products/:productId  
Example: /api/products/67895ebafad0445cbc354eac

``` json
{
    "result": {
        "_id": "67895ebafad0445cbc354eac",
        "name": "Iphone",
        "owner": "67895ebafad0445cbc354ea5",
        "price": 5000,
        "image": "iphone.png",
        "tags": [
            "lifestyle",
            "mobile"
        ],
        "__v": 0
    }
}
```

### Create new product

POST /api/products/  

### Update product by id

PUT /api/products/:productId

Example: /api/products/67895ebafad0445cbc354eac  
Changing values of price and image whit using the product id

``` json
{
    "result": {
        "_id": "67895ebafad0445cbc354eac",
        "name": "Iphone",
        "owner": "67895ebafad0445cbc354ea5",
        "price": 50,
        "image": "image-1737305699993-Capture-202600.jpg",
        "tags": [
            "lifestyle",
            "mobile"
        ],
        "__v": 0
    }
}
```

### Delete product by id

DELETE /api/products/:productId