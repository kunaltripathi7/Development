// tuples rule apply only at time of creation, once created -> can push/pop
// enum still works if you change the value in enum, value increments from there.
// enum use case -> to define constants(giving literals a representation to increase readability) like orderStatus. || enums add code to js.
const enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  RETURNED,
} // it doesn't convert into obj. instead it assigns value to it.
