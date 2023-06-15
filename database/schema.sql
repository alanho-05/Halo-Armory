set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."shoppingCart" (
	"shoppingCartId" serial NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "shoppingCart_pk" PRIMARY KEY ("shoppingCartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."products" (
	"productId" serial NOT NULL,
	"type" TEXT NOT NULL,
	"faction" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"price" integer NOT NULL,
	"description" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderId" serial NOT NULL,
	"userId" integer NOT NULL,
	"orderDate" DATE NOT NULL,
	"total" integer NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."shoppingCartItem" (
	"shoppingCartItemid" serial NOT NULL,
	"productId" integer NOT NULL,
	"shoppingCartId" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "shoppingCartItem_pk" PRIMARY KEY ("shoppingCartItemid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orderItem" (
	"orderItemsId" serial NOT NULL,
	"orderId" integer NOT NULL,
	"name" TEXT NOT NULL,
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"imageUrl" TEXT NOT NULL,
	CONSTRAINT "orderItem_pk" PRIMARY KEY ("orderItemsId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "shoppingCart" ADD CONSTRAINT "shoppingCart_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "shoppingCartItem" ADD CONSTRAINT "shoppingCartItem_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
ALTER TABLE "shoppingCartItem" ADD CONSTRAINT "shoppingCartItem_fk1" FOREIGN KEY ("shoppingCartId") REFERENCES "shoppingCart"("shoppingCartId");

ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");
