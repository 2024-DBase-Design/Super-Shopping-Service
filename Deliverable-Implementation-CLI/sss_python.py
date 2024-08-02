import json

import click
import requests

BASE_URL = "http://localhost:{port}/api/customers"
PORT = "3000"  # Replace with your server's port

def display_menu():
    """Display the main menu"""
    print("\nSuperShoppingService CLI")
    print("1. Manage Customers")
    print("2. Manage Products")
    print("3. Manage Staff")
    print("4. Manage Stock")
    print("5. Manage Suppliers")
    print("6. Manage Warehouses")
    print("7. Exit")
    choice = input("Enter your choice: ")
    return choice


@click.group()
def cli():
    """Super Shopping Service CLI"""
    pass


#
# ---------------------- CUSTOMER MANAGEMENT ----------------------
#
@cli.command()
@click.option("--first-name", prompt="First Name", help="First name of the customer.")
@click.option("--last-name", prompt="Last Name", help="Last name of the customer.")
@click.option("--email", prompt="Email", help="Email of the customer.")
@click.option("--password", prompt="Password", help="Password of the customer.")
def create_customer(first_name, last_name, email, password):
    """Create a new customer"""
    url = f"{BASE_URL}".format(port=PORT)
    payload = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "password": password,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.option("--email", prompt="Email", help="Email of the customer.")
@click.option("--password", prompt="Password", help="Password of the customer.")
def login_customer(email, password):
    """Login a customer"""
    url = f"http://localhost:{PORT}/api/auth/login"
    payload = {"email": email, "password": password}
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())
    else:
        click.echo("Invalid email or password.")


@cli.command()
@click.argument("customer_id")
def get_customer(customer_id):
    """Get details of a specific customer"""
    url = f"{BASE_URL}/{customer_id}".format(port=PORT)
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.option("--first-name", help="New first name of the customer.")
def update_customer(customer_id, first_name):
    """Update customer details"""
    url = f"{BASE_URL}/{customer_id}".format(port=PORT)
    payload = {}
    if first_name:
        payload["firstName"] = first_name
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
def delete_customer(customer_id):
    """Delete a customer"""
    url = f"{BASE_URL}/{customer_id}".format(port=PORT)
    response = requests.delete(url)
    if response.status_code == 204:
        print("Customer deleted successfully.")


# Address Management
@cli.command()
@click.argument("customer_id")
@click.option(
    "--address-line-one", prompt="Address Line One", help="First line of the address."
)
@click.option(
    "--address-line-two", prompt="Address Line Two", help="Second line of the address."
)
@click.option("--city", prompt="City", help="City of the address.")
@click.option("--state", prompt="State", help="State of the address.")
@click.option("--zip", prompt="ZIP Code", help="ZIP Code of the address.")
@click.option("--country", prompt="Country", help="Country of the address.")
@click.option(
    "--type", prompt="Type", help="Type of the address (e.g., DELIVERY, BILLING)."
)
def create_address(
    customer_id, address_line_one, address_line_two, city, state, zip, country, type
):
    """Create a new address for a customer"""
    url = f"{BASE_URL}/{customer_id}/addresses".format(port=PORT)
    payload = {
        "addressLineOne": address_line_one,
        "addressLineTwo": address_line_two,
        "city": city,
        "state": state,
        "zip": zip,
        "country": country,
        "type": type,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
def get_addresses(customer_id):
    """Get all addresses for a customer"""
    url = f"{BASE_URL}/{customer_id}/addresses".format(port=PORT)
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("address_id")
@click.option("--address-line-one", help="New address line one.")
def update_address(customer_id, address_id, address_line_one):
    """Update an address for a customer"""
    url = f"{BASE_URL}/{customer_id}/addresses/{address_id}".format(port=PORT)
    payload = {}
    if address_line_one:
        payload["addressLineOne"] = address_line_one
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("address_id")
def delete_address(customer_id, address_id):
    """Delete an address for a customer"""
    url = f"{BASE_URL}/{customer_id}/addresses/{address_id}".format(port=PORT)
    response = requests.delete(url)
    if response.status_code == 204:
        print("Address deleted successfully.")


# Credit Card Management
@cli.command()
@click.argument("customer_id")
@click.option("--card-number", prompt="Card Number", help="Credit card number.")
@click.option(
    "--expiry-date", prompt="Expiry Date", help="Expiry date of the card (MM/YY)."
)
@click.option("--cvv", prompt="CVV", help="CVV code of the card.")
@click.option(
    "--address-line-one",
    prompt="Billing Address Line One",
    help="Billing address line one.",
)
@click.option(
    "--address-line-two",
    prompt="Billing Address Line Two",
    help="Billing address line two.",
)
@click.option("--city", prompt="City", help="Billing address city.")
@click.option("--state", prompt="State", help="Billing address state.")
@click.option("--zip", prompt="ZIP Code", help="Billing address ZIP code.")
@click.option("--country", prompt="Country", help="Billing address country.")
def create_credit_card(
    customer_id,
    card_number,
    expiry_date,
    cvv,
    address_line_one,
    address_line_two,
    city,
    state,
    zip,
    country,
):
    """Create a new credit card for a customer"""
    url = f"{BASE_URL}/{customer_id}/creditCards".format(port=PORT)
    payload = {
        "cardNumber": card_number,
        "expiryDate": expiry_date,
        "cvv": cvv,
        "billingAddress": {
            "addressLineOne": address_line_one,
            "addressLineTwo": address_line_two,
            "city": city,
            "state": state,
            "zip": zip,
            "country": country,
            "type": "BILLING",
            "customerId": customer_id,
        },
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
def get_credit_cards(customer_id):
    """Get all credit cards for a customer"""
    url = f"{BASE_URL}/{customer_id}/creditCards".format(port=PORT)
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("credit_card_id")
@click.option("--cvv", prompt="New CVV", help="New CVV code.")
def update_credit_card(customer_id, credit_card_id, cvv):
    """Update a credit card for a customer"""
    url = f"{BASE_URL}/{customer_id}/creditCards/{credit_card_id}".format(port=PORT)
    payload = {"cvv": cvv}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("credit_card_id")
def delete_credit_card(customer_id, credit_card_id):
    """Delete a credit card for a customer"""
    url = f"{BASE_URL}/{customer_id}/creditCards/{credit_card_id}".format(port=PORT)
    response = requests.delete(url)
    if response.status_code == 204:
        print("Credit card deleted successfully.")


# Cart Management
@cli.command()
@click.argument("customer_id")
@click.option("--product-id", prompt="Product ID", help="ID of the product.")
@click.option("--quantity", prompt="Quantity", help="Quantity of the product.")
def add_cart_item(customer_id, product_id, quantity):
    """Add an item to the cart"""
    url = f"{BASE_URL}/{customer_id}/cart".format(port=PORT)
    payload = {"productId": product_id, "quantity": quantity}
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
def get_cart(customer_id):
    """Get all items in the cart"""
    url = f"{BASE_URL}/{customer_id}/cart".format(port=PORT)
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("cart_item_id")
@click.option("--quantity", prompt="New Quantity", help="New quantity of the product.")
def update_cart_item(customer_id, cart_item_id, quantity):
    """Update a cart item"""
    url = f"{BASE_URL}/{customer_id}/cart/{cart_item_id}".format(port=PORT)
    payload = {"quantity": quantity}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("cart_item_id")
def delete_cart_item(customer_id, cart_item_id):
    """Delete an item from the cart"""
    url = f"{BASE_URL}/{customer_id}/cart/{cart_item_id}".format(port=PORT)
    response = requests.delete(url)
    if response.status_code == 204:
        print("Item deleted successfully.")


# Order Management
@cli.command()
@click.argument("customer_id")
@click.option("--card-id", prompt="Card ID", help="ID of the credit card used.")
@click.option("--delivery-plan-type", prompt="Delivery Plan type", help="Delivery plan (type).")
@click.option("--delivery-plan-price", prompt="Delivery Plan price", help="Delivery plan (price).")
@click.option("--delivery-plan-delivery-date", prompt="Delivery Plan delivery-date", help="Delivery plan (delivery-date).")
@click.option("--delivery-plan-sent-date", prompt="Delivery Plan sent-date", help="Delivery plan (sent-date).")

def create_order(customer_id, card_id, delivery_plan_type, delivery_plan_price, delivery_plan_delivery_date, delivery_plan_sent_date):
    """Create a new order"""
    url = f"{BASE_URL}/{customer_id}/orders".format(port=PORT)
    delivery_plan = {
        "type": delivery_plan_type,
        "price": delivery_plan_price,
        "deliveryDate": delivery_plan_delivery_date,
        "sentDate": delivery_plan_sent_date
    }
    payload = {
        "cardId": int(card_id),
        "deliveryPlan": delivery_plan
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())
    else:
        click.echo(f"Error: {response.status_code} - {response.text}")

@cli.command()
@click.argument("customer_id")
def get_orders(customer_id):
    """Get all orders for a customer"""
    url = f"{BASE_URL}/{customer_id}/orders".format(port=PORT)
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("order_id")
def get_order(customer_id, order_id):
    """Get a specific order"""
    url = f"{BASE_URL}/{customer_id}/orders/{order_id}".format(port=PORT)
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("order_id")
@click.option("--status", prompt="Status", help="New status of the order.")
def update_order(customer_id, order_id, status):
    """Update an order"""
    url = f"{BASE_URL}/{customer_id}/orders/{order_id}".format(port=PORT)
    payload = {"status": status}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("customer_id")
@click.argument("order_id")
def delete_order(customer_id, order_id):
    """Delete an order"""
    url = f"{BASE_URL}/{customer_id}/orders/{order_id}".format(port=PORT)
    response = requests.delete(url)
    if response.status_code == 204:
        print("Order deleted successfully.")

#
# ---------------------- PRODUCT MANAGEMENT ----------------------
#
@cli.command()
@click.option("--image", prompt="Image URL", help="URL of the product image.")
@click.option("--name", prompt="Product Name", help="Name of the product.")
@click.option("--price", prompt="Price", type=float, help="Price of the product.")
@click.option(
    "--description", prompt="Description", help="Detailed description of the product."
)
@click.option("--category", prompt="Category", help="Category of the product.")
@click.option("--brand", prompt="Brand", help="Brand of the product.")
@click.option("--size", prompt="Size", help="Size of the product.")
@click.option(
    "--supplier-id", prompt="Supplier ID", type=int, help="ID of the supplier."
)
def create_product(image, name, price, description, category, brand, size, supplier_id):
    """Create a new product"""
    url = f"http://localhost:{PORT}/api/products"
    payload = {
        "image": image,
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "brand": brand,
        "size": size,
        "supplierId": supplier_id,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
def get_products():
    """Get all products"""
    url = f"http://localhost:{PORT}/api/products"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("product_id")
def get_product(product_id):
    """Get details of a specific product"""
    url = f"http://localhost:{PORT}/api/products/{product_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("product_id")
@click.option("--size", prompt="Size", help="New size of the product.")
def update_product(product_id, size):
    """Update a specific product's details"""
    url = f"http://localhost:{PORT}/api/products/{product_id}"
    payload = {"size": size}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("product_id")
def delete_product(product_id):
    """Delete a product"""
    url = f"http://localhost:{PORT}/api/products/{product_id}"
    response = requests.delete(url)
    if response.status_code == 204:
        print("Product deleted successfully.")


@cli.command()
@click.option("--name", prompt="Name", help="Name of the product.")
#@click.option("--category", prompt="Category", help="Category of the product.")
#@click.option("--brand", prompt="Brand", help="Brand of the product.")
#@click.option("--size", prompt="Size", help="Size of the product.")
#@click.option("--description", prompt="Description", help="Description of the product.")
def search_products(name): #category, brand, size, description):
    """Search for products given query parameters"""
    url = f"http://localhost:{PORT}/api/products/search"
    params = {
        "name": name,
        #"category": category,
        #"brand": brand,
        #"size": size,
        #"description": description,
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("product_id")
def product_warehouses(product_id):
    """Get warehouses storing a specific product"""
    url = f"http://localhost:{PORT}/api/products/{product_id}/warehouses"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


#
# ---------------------- STAFF MANAGEMENT ----------------------
#
@cli.command()
@click.option("--first-name", prompt="First Name", help="First name of the staff.")
@click.option("--last-name", prompt="Last Name", help="Last name of the staff.")
@click.option("--email", prompt="Email", help="Email of the staff.")
@click.option("--password", prompt="Password", help="Password of the staff.")
@click.option("--job-title", prompt="Job Title", help="Job title of the staff.")
@click.option("--salary", prompt="Salary", type=int, help="Salary of the staff.")
def create_staff(first_name, last_name, email, password, job_title, salary):
    """Create a new staff member"""
    url = f"http://localhost:{PORT}/api/staff"
    payload = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "password": password,
        "jobTitle": job_title,
        "salary": salary,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.option("--email", prompt="Email", help="Email of the staff.")
@click.option("--password", prompt="Password", help="Password of the staff.")
def login_staff(email, password):
    """Login a staff member"""
    url = f"http://localhost:{PORT}/api/auth/login"
    payload = {"email": email, "password": password}
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
def get_all_staff():
    """Get all staff members"""
    url = f"http://localhost:{PORT}/api/staff"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("staff_id")
def get_staff(staff_id):
    """Get details of a specific staff member"""
    url = f"http://localhost:{PORT}/api/staff/{staff_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("staff_id")
@click.option("--name", prompt="Name", help="New name of the staff.")
def update_staff(staff_id, name):
    """Update a specific staff member's details"""
    url = f"http://localhost:{PORT}/api/staff/{staff_id}"
    payload = {"name": name}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("staff_id")
def delete_staff(staff_id):
    """Delete a staff member"""
    url = f"http://localhost:{PORT}/api/staff/{staff_id}"
    response = requests.delete(url)
    if response.status_code == 204:
        print("Staff member deleted successfully.")


# Staff Address Management
@cli.command()
@click.argument("staff_id")
@click.option(
    "--address-line-one", prompt="Address Line One", help="First line of the address."
)
@click.option(
    "--address-line-two", prompt="Address Line Two", help="Second line of the address."
)
@click.option("--city", prompt="City", help="City of the address.")
@click.option("--state", prompt="State", help="State of the address.")
@click.option("--zip", prompt="ZIP Code", help="ZIP Code of the address.")
@click.option("--country", prompt="Country", help="Country of the address.")
@click.option("--type", prompt="Type", help="Type of the address (e.g., DELIVERY).")
def create_staff_address(
    staff_id, address_line_one, address_line_two, city, state, zip, country, type
):
    """Create a new address for a staff member"""
    url = f"http://localhost:{PORT}/api/staff/{staff_id}/address"
    payload = {
        "addressLineOne": address_line_one,
        "addressLineTwo": address_line_two,
        "city": city,
        "state": state,
        "zip": zip,
        "country": country,
        "type": type,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.argument("staff_id")
def get_staff_addresses(staff_id):
    """Get all addresses for a staff member"""
    url = f"http://localhost:{PORT}/api/staff/{staff_id}/address"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("staff_id")
@click.option(
    "--address-line-one", prompt="New Address Line One", help="New address line one."
)
def update_staff_address(staff_id, address_line_one):
    """Update an address for a staff member"""
    url = f"http://localhost:{PORT}/api/staff/{staff_id}/address"
    payload = {"addressLineOne": address_line_one}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("staff_id")
def delete_staff_address(staff_id):
    """Delete an address for a staff member"""
    url = f"http://localhost:{PORT}/api/staff/{staff_id}/address"
    response = requests.delete(url)
    if response.status_code == 204:
        print("Address deleted successfully.")


#
# ---------------------- STOCK MANAGEMENT ----------------------
#
@cli.command()
@click.option("--product-id", prompt="Product ID", help="ID of the product.")
@click.option("--warehouse-id", prompt="Warehouse ID", help="ID of the warehouse.")
@click.option("--quantity", prompt="Quantity", type=int, help="Quantity of the stock.")
def create_stock(product_id, warehouse_id, quantity):
    """Create a new stock entry"""
    url = f"http://localhost:{PORT}/api/stock"
    payload = {
        "productId": int(product_id),
        "warehouseId": int(warehouse_id),
        "quantity": int(quantity),
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())
    else:
        click.echo(response.text)


@cli.command()
def get_stock():
    """Get all available stock"""
    url = f"http://localhost:{PORT}/api/stock"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("stock_id")
def get_stock_details(stock_id):
    """Get details of a specific stock"""
    url = f"http://localhost:{PORT}/api/stock/{stock_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("product_id")
def get_stock_by_product(product_id):
    """Get stock details by product ID"""
    url = f"http://localhost:{PORT}/api/stock/product/{product_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("warehouse_id")
def get_stock_by_warehouse(warehouse_id):
    """Get stock details by warehouse ID"""
    url = f"http://localhost:{PORT}/api/stock/warehouse/{warehouse_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("stock_id")
@click.option(
    "--quantity", prompt="New Quantity", type=int, help="New quantity of the stock."
)
def update_stock(stock_id, quantity):
    """Update a stock's details"""
    url = f"http://localhost:{PORT}/api/stock/{stock_id}"
    payload = {"quantity": quantity}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("stock_id")
def delete_stock(stock_id):
    """Delete a stock entry"""
    url = f"http://localhost:{PORT}/api/stock/{stock_id}"
    response = requests.delete(url)
    if response.status_code == 204:
        print("Stock entry deleted successfully.")


#
## ---------------------- SUPPLIER MANAGEMENT ----------------------
#
@cli.command()
@click.option("--name", prompt="Name", help="Name of the supplier.")
def create_supplier(name):
    """Create a new supplier"""
    url = f"http://localhost:{PORT}/api/suppliers"
    payload = {"name": name}
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())
    else:
        click.echo("Failed to create supplier.")


@cli.command()
def get_suppliers():
    """Get all suppliers"""
    url = f"http://localhost:{PORT}/api/suppliers"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
def get_supplier(supplier_id):
    """Get details of a specific supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
@click.option("--name", prompt="Name", help="New name of the supplier.")
def update_supplier(supplier_id, name):
    """Update a specific supplier's details"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}"
    payload = {"name": name}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
def delete_supplier(supplier_id):
    """Delete a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}"
    response = requests.delete(url)
    if response.status_code == 204:
        print("Supplier deleted successfully.")


# Supplier Address Management
@cli.command()
@click.argument("supplier_id")
@click.option(
    "--address-line-one", prompt="Address Line One", help="First line of the address."
)
@click.option(
    "--address-line-two", prompt="Address Line Two", help="Second line of the address."
)
@click.option("--city", prompt="City", help="City of the address.")
@click.option("--state", prompt="State", help="State of the address.")
@click.option("--zip", prompt="ZIP Code", help="ZIP Code of the address.")
@click.option("--country", prompt="Country", help="Country of the address.")
@click.option("--type", prompt="Type", help="Type of the address (e.g., delivery).")
def create_supplier_address(
    supplier_id, address_line_one, address_line_two, city, state, zip, country, type
):
    """Create a new address for a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/address"
    payload = {
        "addressLineOne": address_line_one,
        "addressLineTwo": address_line_two,
        "city": city,
        "state": state,
        "zip": zip,
        "country": country,
        "type": type,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
def get_supplier_address(supplier_id):
    """Get the address of a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/address"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
@click.argument("supplier_address_id")
@click.option(
    "--address-line-one", prompt="New Address Line One", help="New address line one."
)
def update_supplier_address(supplier_id, supplier_address_id, address_line_one):
    """Update the address of a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/address/{supplier_address_id}"
    payload = {"addressLineOne": address_line_one}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
@click.argument("supplier_address_id")
def delete_supplier_address(supplier_id, supplier_address_id):
    """Delete the address of a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/address/{supplier_address_id}"
    response = requests.delete(url)
    if response.status_code == 204:
        print( "Address deleted successfully.")


# Supplier Product Management
@cli.command()
@click.argument("supplier_id")
@click.option("--image", prompt="Image URL", help="URL of the product image.")
@click.option("--name", prompt="Product Name", help="Name of the product.")
@click.option("--price", prompt="Price", type=float, help="Price of the product.")
@click.option(
    "--description", prompt="Description", help="Detailed description of the product."
)
@click.option("--category", prompt="Category", help="Category of the product.")
@click.option("--brand", prompt="Brand", help="Brand of the product.")
@click.option("--size", prompt="Size", help="Size of the product.")
def create_supplier_product(
    supplier_id, image, name, price, description, category, brand, size
):
    """Create a new product for a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/products"
    payload = {
        "image": image,
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "brand": brand,
        "size": size,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
def get_supplier_products(supplier_id):
    """Get all products of a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/products"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
@click.argument("supplier_product_id")
def get_supplier_product(supplier_id, supplier_product_id):
    """Get details of a specific product from a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/products/{supplier_product_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
@click.argument("supplier_product_id")
@click.option("--size", prompt="New Size", help="New size of the product.")
def update_supplier_product(supplier_id, supplier_product_id, size):
    """Update a specific product's details from a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/products/{supplier_product_id}"
    payload = {"size": size}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("supplier_id")
@click.argument("supplier_product_id")
def delete_supplier_product(supplier_id, supplier_product_id):
    """Delete a product from a supplier"""
    url = f"http://localhost:{PORT}/api/suppliers/{supplier_id}/products/{supplier_product_id}"
    response = requests.delete(url)
    if response.status_code == 204:
        print("Product deleted successfully.")


#
# ---------------------- WAREHOUSE MANAGEMENT ----------------------
#
@cli.command()
@click.option(
    "--capacity", prompt="Capacity", type=int, help="Capacity of the warehouse."
)
@click.option(
    "--address-line-one",
    prompt="Address Line One",
    help="First line of the warehouse address.",
)
@click.option(
    "--address-line-two",
    prompt="Address Line Two",
    help="Second line of the warehouse address.",
)
@click.option("--city", prompt="City", help="City of the warehouse address.")
@click.option("--state", prompt="State", help="State of the warehouse address.")
@click.option("--zip", prompt="ZIP Code", help="ZIP Code of the warehouse address.")
@click.option("--country", prompt="Country", help="Country of the warehouse address.")
@click.option("--type", prompt="Type", help="Type of the address (e.g., delivery).")
@click.option("--name", prompt="Warehouse Name", help="Name of the warehouse.")
def create_warehouse(
    capacity, address_line_one, address_line_two, city, state, zip, country, type, name
):
    """Create a new warehouse"""
    url = f"http://localhost:{PORT}/api/warehouses"
    payload = {
        "capacity": capacity,
        "address": {
            "addressLineOne": address_line_one,
            "addressLineTwo": address_line_two,
            "city": city,
            "state": state,
            "zip": zip,
            "country": country,
            "type": type,
        },
        "name": name,
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        click.echo(response.json())


@cli.command()
def get_warehouses():
    """Get all available warehouses"""
    url = f"http://localhost:{PORT}/api/warehouses"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("warehouse_id")
def get_warehouse(warehouse_id):
    """Get details of a specific warehouse"""
    url = f"http://localhost:{PORT}/api/warehouses/{warehouse_id}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("warehouse_id")
@click.option(
    "--capacity", prompt="New Capacity", type=int, help="New capacity of the warehouse."
)
def update_warehouse(warehouse_id, capacity):
    """Update a specific warehouse's details"""
    url = f"http://localhost:{PORT}/api/warehouses/{warehouse_id}"
    payload = {"capacity": capacity}
    response = requests.put(url, json=payload)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("warehouse_id")
def delete_warehouse(warehouse_id):
    """Delete a specific warehouse"""
    url = f"http://localhost:{PORT}/api/warehouses/{warehouse_id}"
    response = requests.delete(url)
    if response.status_code == 204:
        print("Warehouse deleted successfully.")    


@cli.command()
@click.argument("warehouse_id")
def get_warehouse_stock(warehouse_id):
    """Get stock of a specific warehouse"""
    url = f"http://localhost:{PORT}/api/warehouses/{warehouse_id}/stock"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("warehouse_id")
def get_warehouse_addresses(warehouse_id):
    """Get addresses associated with a specific warehouse"""
    url = f"http://localhost:{PORT}/api/warehouses/{warehouse_id}/addresses"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


@cli.command()
@click.argument("warehouse_name")
def filter_warehouses_by_name(warehouse_name):
    """Filter warehouses by name"""
    url = f"http://localhost:{PORT}/api/warehouses/filter/{warehouse_name}"
    response = requests.get(url)
    if response.status_code == 200:
        click.echo(response.json())


def main():
    """Main function to run the CLI with a menu interface"""
    while True:
        choice = display_menu()
        if choice == "1":
            print("\nCustomer Menu")
            print("1. Customer Management")
            print("2. Address Management")
            print("3. Credit Card Management")
            print("4. Cart Management")
            print("5. Order Management")
            customer_menu_choice = input("Enter your choice: ")

            if customer_menu_choice == "1":
                # Customer Management
                print("\nCustomer Management")
                print("1. Create Customer")
                print("2. Login Customer")
                print("3. Get Customer")
                print("4. Update Customer")  # only first name for now
                print("5. Delete Customer")
                customer_choice = input("Enter your choice: ")

                if customer_choice == "1":
                    first_name = input("First Name: ")
                    last_name = input("Last Name: ")
                    email = input("Email: ")
                    password = input("Password: ")
                    args = [
                        "create-customer",
                        "--first-name",
                        first_name,
                        "--last-name",
                        last_name,
                        "--email",
                        email,
                        "--password",
                        password,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif customer_choice == "2":
                    email = input("Email: ")
                    password = input("Password: ")
                    args = ["login-customer", "--email", email, "--password", password]
                    cli.main(args=args, standalone_mode=False)
                elif customer_choice == "3":
                    customer_id = input("Customer ID: ")
                    args = ["get-customer", customer_id]
                    cli.main(args=args, standalone_mode=False)
                elif customer_choice == "4":
                    customer_id = input("Customer ID: ")
                    first_name = input("New First Name: ")
                    args = ["update-customer", customer_id, "--first-name", first_name]
                    cli.main(args=args, standalone_mode=False)
                elif customer_choice == "5":
                    customer_id = input("Customer ID: ")
                    args = ["delete-customer", customer_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")

            elif customer_menu_choice == "2":
                # Address Management
                print("\nAddress Management")
                print("1. Create Address")
                print("2. Get Addresses")
                print("3. Get Address")
                print("4. Update Address")
                print("5. Delete Address")
                address_choice = input("Enter your choice: ")
            
                if address_choice == "1":
                    customer_id = input("Customer ID: ")
                    address_line_one = input("Address Line One: ")
                    address_line_two = input("Address Line Two: ")
                    city = input("City: ")
                    state = input("State: ")
                    zip = input("ZIP Code: ")
                    country = input("Country: ")
                    address_type = input("Type: ")
                    args = [
                        "create-address",
                        customer_id,
                        "--address-line-one",
                        address_line_one,
                        "--address-line-two",
                        address_line_two,
                        "--city",
                        city,
                        "--state",
                        state,
                        "--zip",
                        zip,
                        "--country",
                        country,
                        "--type",
                        address_type,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif address_choice == "2":
                    customer_id = input("Customer ID: ")
                    args = ["get-addresses", customer_id]
                    cli.main(args=args, standalone_mode=False)
                elif address_choice == "3":
                    address_id = input("Address ID: ")
                    args = ["get-address", address_id]
                    cli.main(args=args, standalone_mode=False)
                elif address_choice == "4":
                    address_id = input("Address ID: ")
                    address_line_one = input("New Address Line One: ")
                    args = ["update-address", address_id, "--address-line-one", address_line_one]
                    cli.main(args=args, standalone_mode=False)
                elif address_choice == "5":
                    address_id = input("Address ID: ")
                    args = ["delete-address", address_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")
            
            elif customer_menu_choice == "3":
                # Credit Card Management
                print("\nCredit Card Management")
                print("1. Create Credit Card")
                print("2. Get Credit Cards")
                print("3. Get Credit Card")
                print("4. Update Credit Card")
                print("5. Delete Credit Card")
                credit_card_choice = input("Enter your choice: ")

                if credit_card_choice == "1":
                    customer_id = input("Customer ID: ")
                    card_number = input("Card Number: ")
                    expiration_date = input("Expiration Date: ")
                    cvv = input("CVV: ")
                    args = [
                        "create-credit-card",
                        customer_id,
                        "--card-number",
                        card_number,
                        "--expiry-date",
                        expiration_date,
                        "--cvv",
                        cvv,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif credit_card_choice == "2":
                    customer_id = input("Customer ID: ")
                    args = ["get-credit-cards", customer_id]
                    cli.main(args=args, standalone_mode=False)
                elif credit_card_choice == "3":
                    card_id = input("Card ID: ")
                    args = ["get-credit-card", card_id]
                    cli.main(args=args, standalone_mode=False)
                elif credit_card_choice == "4":
                    card_id = input("Card ID: ")
                    expiration_date = input("New Expiration Date: ")
                    args = ["update-credit-card", card_id, "--expiration-date", expiration_date]
                    cli.main(args=args, standalone_mode=False)
                elif credit_card_choice == "5":
                    card_id = input("Card ID: ")
                    args = ["delete-credit-card", card_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")
                    
            elif customer_menu_choice == "4":
                # Cart Management
                print("\nCart Management")
                print("1. Add Cart Item")
                print("2. Get Cart")
                print("3. Update Cart")
                print("4. Delete Cart")
                cart_choice = input("Enter your choice: ")
                
                if cart_choice == "1":
                    customer_id = input("Customer ID: ")
                    args = ["add-cart-item", customer_id]
                    cli.main(args=args, standalone_mode=False)
                elif cart_choice == "2":
                    customer_id = input("Customer ID: ")
                    args = ["get-cart", customer_id]
                    cli.main(args=args, standalone_mode=False)
                elif cart_choice == "3":
                    customer_id = input("Customer ID: ")
                    product_id = input("Product ID: ")
                    quantity = input("Quantity: ")
                    args = ["update-cart", customer_id, product_id, quantity]
                    cli.main(args=args, standalone_mode=False)
                elif cart_choice == "4":
                    cart_id = input("Cart ID: ")
                    args = ["delete-cart", cart_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")
            
            elif customer_menu_choice == "5":
                # Order Management
                print("\nOrder Management")
                print("1. Create Order")
                print("2. Get Orders")
                print("3. Get Order")
                print("4. Update Order")
                print("5. Delete Order")
                order_choice = input("Enter your choice: ")

                if order_choice == "1":
                    customer_id = input("Customer ID: ")
                    args = ["create-order", customer_id]
                    cli.main(args=args, standalone_mode=False)
                elif order_choice == "2":
                    customer_id = input("Customer ID: ")
                    args = ["get-orders", customer_id]
                    cli.main(args=args, standalone_mode=False)
                elif order_choice == "3":
                    order_id = input("Order ID: ")
                    args = ["get-order", order_id]
                    cli.main(args=args, standalone_mode=False)
                elif order_choice == "4":
                    order_id = input("Order ID: ")
                    status = input("New Status: ")
                    args = ["update-order", order_id, "--status", status]
                    cli.main(args=args, standalone_mode=False)
                elif order_choice == "5":
                    order_id = input("Order ID: ")
                    args = ["delete-order", order_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")
            
            else:
                print("Invalid choice. Please try again.")

        elif choice == "2":
            # Product Management
            print("\nProduct Management")
            print("1. Create Product")
            print("2. Get Products")
            print("3. Get Product")
            print("4. Update Product")
            print("5. Delete Product")
            print("6. Search Products")
            print("7. Get Product Warehouses")
            product_choice = input("Enter your choice: ")

            if product_choice == "1":
                image = input("Image URL: ")
                name = input("Product Name: ")
                price = float(input("Price: "))
                description = input("Description: ")
                category = input("Category: ")
                brand = input("Brand: ")
                size = input("Size: ")
                args = [
                    "create-product",
                    "--image",
                    image,
                    "--name",
                    name,
                    "--price",
                    price,
                    "--description",
                    description,
                    "--category",
                    category,
                    "--brand",
                    brand,
                    "--size",
                    size,
                ]
                cli.main(args=args, standalone_mode=False)
            elif product_choice == "2":
                args = ["get-products"]
                cli.main(args=args, standalone_mode=False)
            elif product_choice == "3":
                product_id = input("Product ID: ")
                args = ["get-product", product_id]
                cli.main(args=args, standalone_mode=False)
            elif product_choice == "4":
                product_id = input("Product ID: ")
                size = input("New Size: ")
                args = ["update-product", product_id, "--size", size]
                cli.main(args=args, standalone_mode=False)
            elif product_choice == "5":
                product_id = input("Product ID: ")
                args = ["delete-product", product_id]
                cli.main(args=args, standalone_mode=False)
            elif product_choice == "6":
                # search_term = input("Search Term: ")
                args = ["search-products"]
                cli.main(args=args, standalone_mode=False)
            elif product_choice == "7":
                product_id = input("Product ID: ")
                args = ["get-product-warehouses", product_id]
                cli.main(args=args, standalone_mode=False)
            else:
                print("Invalid choice. Please try again.")

        elif choice == "3":
            print("\nStaff Menu")
            print("1. Staff Management")
            print("2. Staff Address Management")
            staff_menu_choice = input("Enter your choice: ")

            if staff_menu_choice == "1":
                # Staff Management
                print("\nStaff Management")
                print("1. Create Staff")
                print("2. Login Staff")
                print("3. Get All Staff")
                print("4. Get Staff")
                print("5. Update Staff")
                print("6. Delete Staff")
                staff_choice = input("Enter your choice: ")

                if staff_choice == "1":
                    first_name = input("First Name: ")
                    last_name = input("Last Name: ")
                    email = input("Email: ")
                    password = input("Password: ")
                    job_title = input("Job Title: ")
                    salary = int(input("Salary: "))
                    args = [
                        "create-staff",
                        "--first-name",
                        first_name,
                        "--last-name",
                        last_name,
                        "--email",
                        email,
                        "--password",
                        password,
                        "--job-title",
                        job_title,
                        "--salary",
                        salary,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif staff_choice == "2":
                    email = input("Email: ")
                    password = input("Password: ")
                    args = ["login-staff", "--email", email, "--password", password]
                    cli.main(args=args, standalone_mode=False)
                elif staff_choice == "3":
                    args = ["get-all-staff"]
                    cli.main(args=args, standalone_mode=False)
                elif staff_choice == "4":
                    staff_id = input("Staff ID: ")
                    args = ["get-staff", staff_id]
                    cli.main(args=args, standalone_mode=False)
                elif staff_choice == "5":
                    staff_id = input("Staff ID: ")
                    name = input("New Name: ")
                    args = ["update-staff", staff_id, "--name", name]
                    cli.main(args=args, standalone_mode=False)
                elif staff_choice == "6":
                    staff_id = input("Staff ID: ")
                    args = ["delete-staff", staff_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")
            
            elif staff_menu_choice == "2":
                print("\nStaff Address Management")
                print("1. Create Staff Address")
                print("2. Get Staff Addresses")
                print("3. Get Staff Address")
                print("4. Update Staff Address")
                print("5. Delete Staff Address")
                
                staff_address_choice = input("Enter your choice: ")
                
                if staff_address_choice == "1":
                    staff_id = input("Staff ID: ")
                    address_line_one = input("Address Line One: ")
                    address_line_two = input("Address Line Two: ")
                    city = input("City: ")
                    state = input("State: ")
                    zip = input("ZIP Code: ")
                    country = input("Country: ")
                    type = input("Type: ")
                    args = [
                        "create-staff-address",
                        staff_id,
                        "--address-line-one",
                        address_line_one,
                        "--address-line-two",
                        address_line_two,
                        "--city",
                        city,
                        "--state",
                        state,
                        "--zip",
                        zip,
                        "--country",
                        country,
                        "--type",
                        type,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif staff_address_choice == "2":
                    staff_id = input("Staff ID: ")
                    args = ["get-staff-addresses", staff_id]
                    cli.main(args=args, standalone_mode=False)
                elif staff_address_choice == "3":
                    staff_id = input("Staff ID: ")
                    address_id = input("Address ID: ")
                    args = ["get-staff-address", staff_id, address_id]
                    cli.main(args=args, standalone_mode=False)
                elif staff_address_choice == "4":
                    staff_id = input("Staff ID: ")
                    address_id = input("Address ID: ")
                    address_line_one = input("New Address Line One: ")
                    args = [
                        "update-staff-address",
                        staff_id,
                        address_id,
                        "--address-line-one",
                        address_line_one,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif staff_address_choice == "5":
                    staff_id = input("Staff ID: ")
                    address_id = input("Address ID: ")
                    args = ["delete-staff-address", staff_id, address_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")

        elif choice == "4":
            # Stock Management
            print("\nStock Management")
            print("1. Create Stock")
            print("2. Get Stock")
            print("3. Get Stock Details")
            print("4. Get Stock by Product")
            print("5. Get Stock by Warehouse")
            print("6. Update Stock")
            print("7. Delete Stock")
            stock_choice = input("Enter your choice: ")

            if stock_choice == "1":
                product_id = input("Product ID: ")
                warehouse_id = input("Warehouse ID: ")
                quantity = int(input("Quantity: "))
                args = [
                    "create-stock",
                    "--product-id",
                    product_id,
                    "--warehouse-id",
                    warehouse_id,
                    "--quantity",
                    quantity,
                ]
                cli.main(args=args, standalone_mode=False)
            elif stock_choice == "2":
                args = ["get-stock"]
                cli.main(args=args, standalone_mode=False)
            elif stock_choice == "3":
                stock_id = input("Stock ID: ")
                args = ["get-stock-details", stock_id]
                cli.main(args=args, standalone_mode=False)
            elif stock_choice == "4":
                product_id = input("Product ID: ")
                args = ["get-stock-by-product", product_id]
                cli.main(args=args, standalone_mode=False)
            elif stock_choice == "5":
                warehouse_id = input("Warehouse ID: ")
                args = ["get-stock-by-warehouse", warehouse_id]
                cli.main(args=args, standalone_mode=False)
            elif stock_choice == "6":
                stock_id = input("Stock ID: ")
                quantity = int(input("New Quantity: "))
                args = ["update-stock", stock_id, "--quantity", quantity]
                cli.main(args=args, standalone_mode=False)
            elif stock_choice == "7":
                stock_id = input("Stock ID: ")
                args = ["delete-stock", stock_id]
                cli.main(args=args, standalone_mode=False)
            else:
                print("Invalid choice. Please try again.")

        elif choice == "5":
            # Supplier Management
            print("\nSupplier Management")
            print("1. Create Supplier")
            print("2. Get Suppliers")
            print("3. Get Supplier")
            print("4. Update Supplier")
            print("5. Delete Supplier")
            print("6. Supplier Address Management")
            print("7. Supplier Product Management")
            
            supplier_choice = input("Enter your choice: ")

            if supplier_choice == "1":
                name = input("Name: ")
                args = ["create-supplier", "--name", name]
                cli.main(args=args, standalone_mode=False)
            elif supplier_choice == "2":
                args = ["get-suppliers"]
                cli.main(args=args, standalone_mode=False)
            elif supplier_choice == "3":
                supplier_id = input("Supplier ID: ")
                args = ["get-supplier", supplier_id]
                cli.main(args=args, standalone_mode=False)
            elif supplier_choice == "4":
                supplier_id = input("Supplier ID: ")
                name = input("New Name: ")
                args = ["update-supplier", supplier_id, "--name", name]
                cli.main(args=args, standalone_mode=False)
            elif supplier_choice == "5":
                supplier_id = input("Supplier ID: ")
                args = ["delete-supplier", supplier_id]
                cli.main(args=args, standalone_mode=False)
            elif supplier_choice == "6":
                print("\nSupplier Address Management")
                print("1. Create Supplier Address")
                print("2. Get Supplier Address")
                print("3. Update Supplier Address")
                print("4. Delete Supplier Address")
                supplier_address_choice = input("Enter your choice: ")

                if supplier_address_choice == "1":
                    supplier_id = input("Supplier ID: ")
                    address_line_one = input("Address Line One: ")
                    address_line_two = input("Address Line Two: ")
                    city = input("City: ")
                    state = input("State: ")
                    zip = input("ZIP Code: ")
                    country = input("Country: ")
                    type = input("Type: ")
                    args = [
                        "create-supplier-address",
                        supplier_id,
                        "--address-line-one",
                        address_line_one,
                        "--address-line-two",
                        address_line_two,
                        "--city",
                        city,
                        "--state",
                        state,
                        "--zip",
                        zip,
                        "--country",
                        country,
                        "--type",
                        type,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif supplier_address_choice == "2":
                    supplier_id = input("Supplier ID: ")
                    args = ["get-supplier-address", supplier_id]
                    cli.main(args=args, standalone_mode=False)
                elif supplier_address_choice == "3":
                    supplier_id = input("Supplier ID: ")
                    supplier_address_id = input("Supplier Address ID: ")
                    address_line_one = input("New Address Line One: ")
                    args = [
                        "update-supplier-address",
                        supplier_id,
                        supplier_address_id,
                        "--address-line-one",
                        address_line_one,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif supplier_address_choice == "4":
                    supplier_id = input("Supplier ID: ")
                    supplier_address_id = input("Supplier Address ID: ")
                    args = ["delete-supplier-address", supplier_id, supplier_address_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")
            elif supplier_choice == "7":
                print("\nSupplier Product Management")
                print("1. Create Supplier Product")
                print("2. Get Supplier Products")
                print("3. Get Supplier Product")
                print("4. Update Supplier Product")
                print("5. Delete Supplier Product")
                supplier_product_choice = input("Enter your choice: ")

                if supplier_product_choice == "1":
                    supplier_id = input("Supplier ID: ")
                    image = input("Image URL: ")
                    name = input("Product Name: ")
                    price = float(input("Price: "))
                    description = input("Description: ")
                    category = input("Category: ")
                    brand = input("Brand: ")
                    size = input("Size: ")
                    args = [
                        "create-supplier-product",
                        supplier_id,
                        "--image",
                        image,
                        "--name",
                        name,
                        "--price",
                        price,
                        "--description",
                        description,
                        "--category",
                        category,
                        "--brand",
                        brand,
                        "--size",
                        size,
                    ]
                    cli.main(args=args, standalone_mode=False)
                elif supplier_product_choice == "2":
                    supplier_id = input("Supplier ID: ")
                    args = ["get-supplier-products", supplier_id]
                    cli.main(args=args, standalone_mode=False)
                elif supplier_product_choice == "3":
                    supplier_id = input("Supplier ID: ")
                    supplier_product_id = input("Supplier Product ID: ")
                    args = ["get-supplier-product", supplier_id, supplier_product_id]
                    cli.main(args=args, standalone_mode=False)
                elif supplier_product_choice == "4":
                    supplier_id = input("Supplier ID: ")
                    supplier_product_id = input("Supplier Product ID: ")
                    size = input("New Size: ")
                    args = ["update-supplier-product", supplier_id, supplier_product_id, "--size", size]
                    cli.main(args=args, standalone_mode=False)
                elif supplier_product_choice == "5":
                    supplier_id = input("Supplier ID: ")
                    supplier_product_id = input("Supplier Product ID: ")
                    args = ["delete-supplier-product", supplier_id, supplier_product_id]
                    cli.main(args=args, standalone_mode=False)
                else:
                    print("Invalid choice. Please try again.")
            else:
                print("Invalid choice. Please try again.")

        elif choice == "6":
            # Warehouse Management
            print("\nWarehouse Management")
            print("1. Create Warehouse")
            print("2. Get Warehouses")
            print("3. Get Warehouse")
            print("4. Update Warehouse")
            print("5. Delete Warehouse")
            warehouse_choice = input("Enter your choice: ")

            if warehouse_choice == "1":
                capacity = int(input("Capacity: "))
                address_line_one = input("Address Line One: ")
                address_line_two = input("Address Line Two: ")
                city = input("City: ")
                state = input("State: ")
                zip = input("ZIP Code: ")
                country = input("Country: ")
                type = input("Type: ")
                name = input("Warehouse Name: ")
                args = [
                    "create-warehouse",
                    "--capacity",
                    capacity,
                    "--address-line-one",
                    address_line_one,
                    "--address-line-two",
                    address_line_two,
                    "--city",
                    city,
                    "--state",
                    state,
                    "--zip",
                    zip,
                    "--country",
                    country,
                    "--type",
                    type,
                    "--name",
                    name,
                ]
                cli.main(args=args, standalone_mode=False)
            elif warehouse_choice == "2":
                args = ["get-warehouses"]
                cli.main(args=args, standalone_mode=False)
            elif warehouse_choice == "3":
                warehouse_id = input("Warehouse ID: ")
                args = ["get-warehouse", warehouse_id]
                cli.main(args=args, standalone_mode=False)
            elif warehouse_choice == "4":
                warehouse_id = input("Warehouse ID: ")
                capacity = int(input("New Capacity: "))
                args = ["update-warehouse", warehouse_id, "--capacity", capacity]
                cli.main(args=args, standalone_mode=False)
            elif warehouse_choice == "5":
                warehouse_id = input("Warehouse ID: ")
                args = ["delete-warehouse", warehouse_id]
                cli.main(args=args, standalone_mode=False)
            else:
                print("Invalid choice. Please try again.")

        elif choice == "7":
            print("Exiting the program.")
            break

        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
