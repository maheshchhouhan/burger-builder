import React, { useEffect } from "react";

import { connect } from "react-redux";

import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "./Orders.actions";

const Orders = props => {
  const { orders, loading, fetchOrders, token, userId } = props;
  useEffect(() => {
    //ComponentDidMount lifeCycle
    if (userId) {
      fetchOrders(token, userId);
    }
  }, [fetchOrders, userId, token]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) => dispatch(actions.initOrders(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
