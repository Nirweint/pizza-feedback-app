import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import Table from "rc-table";

import {
  fetchPaymentsDataAC,
  setMoneyCollectedAC,
  setTotalOrderAC
} from "../../../store/reducers/payments";
import {roundPrice} from "../../../utils/utilsForPayment";
import {
  selectPaymentsGuests,
  selectPaymentsIsLoading,
  selectPaymentsPizza
} from "../../../store/selectors/payments";

import classes from './styles.module.css';

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
    align: "center"
  },
  {
    title: "Share to pay",
    dataIndex: "price",
    key: "price",
    width: 200,
    align: "center"
  },
  {
    title: "Pay",
    dataIndex: "button",
    key: "button",
    width: 200,
    align: "center"
  }
];

export const PaymentsWidget = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectPaymentsIsLoading)
  const guests = useSelector(selectPaymentsGuests)
  const pizza = useSelector(selectPaymentsPizza)

  const [paidArray, setPaidArray] = useState([]);
  const [pizzaLovers, setPizzaLovers] = useState([]);

  const parts = pizzaLovers.length;

  useEffect(() => {
    // @ts-ignore
    setPizzaLovers(guests.filter(({eatsPizza}) => eatsPizza));
  }, [guests]);

  useEffect(() => {
    dispatch(fetchPaymentsDataAC())
    setPaidArray([])
  }, []);

  const partPrice = Number(pizza.price) / parts || 0;

  useEffect(() => {
    //@ts-ignore
    dispatch(setTotalOrderAC(roundPrice(pizza.price) || 0))
    dispatch(setMoneyCollectedAC(roundPrice(partPrice * paidArray.length)))
  }, [paidArray])

  return (
    <div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          {!!guests.length && (
            <>

              <div>
                {/* create table with react-table */}
                <Table
                  className={classes.table}//@ts-ignore
                  columns={columns}//@ts-ignore
                  data={
                    pizzaLovers.length
                      ? [
                        ...pizzaLovers.map((item, i) => {
                          const isDisabled = paidArray.filter(
                            //@ts-ignore
                            (paidElement) => paidElement.name === item.name
                          ).length;
                          return {
                            name: (
                              <p
                                style={{
                                  //@ts-ignore
                                  color: item.isVegan ? "green" : "black"
                                }}
                              >
                                {/*@ts-ignore*/}
                                {item.name}
                              </p>
                            ),
                            price: (
                              <span>
                                  {isDisabled ? "0" : roundPrice(partPrice)} BYN
                                </span>
                            ),

                            // create colums with btn "Pay"
                            button: (
                              <button
                                className={`${classes.btnPay} ${
                                  isDisabled && classes.disabledBtn
                                }`}
                                onClick={() => {
                                  setPaidArray((prev) => [...prev, item]);
                                }}
                                //@ts-ignore
                                disabled={isDisabled}
                              >
                                {isDisabled ? "PAID" : "PAY"}
                              </button>
                            ),
                            key: i
                          };
                        }),

                        // add "Total order"
                        !isLoading && {
                          name: "Total order",
                          //@ts-ignore
                          price: <p> {roundPrice(pizza.price) || 0} BYN</p>,
                          key: "total"
                        },

                        // add "Money to collect"
                        !isLoading && {
                          name: "Money to collect",
                          price: (
                            <p>
                              {roundPrice(
                                //@ts-ignore
                                pizza.price - partPrice * paidArray.length
                              ) || 0}{" "}
                              BYN
                            </p>
                          ),
                          key: "to collect"
                        },
                        // add "Money collected"
                        !isLoading && {
                          name: "Money collected",
                          price: (
                            <p>
                              {roundPrice(partPrice * paidArray.length)} BYN
                            </p>
                          ),
                          key: "collected"
                        }
                      ]
                      : [{name: "", price: "", button: "", key: "1"}]
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
