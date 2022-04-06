import { useState } from "react";
import { PARTY_GUEST_URL, getGuests, getPizza } from "../../../api";
import { getPizzaType, roundPrice } from "../../../utils/utilsForPayment";
import Table from "rc-table";
import classes from './styles.module.css';

export const PaymentList = () => {
  const [guests, setGuests] = useState([]);
  const [pizza, setPizza] = useState([]);
  const [paidArray, setPaidArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const pizzaLovers = guests.filter(({ eatsPizza }) => eatsPizza);
  const parts = pizzaLovers.length;
  const angle = 360 / parts;

  const handleOnClick = async () => {
    setLoading(true);
    const guests = await getGuests();
    setGuests(guests);
    const pizza = await getPizza(getPizzaType(pizzaLovers), parts);
    setPizza(pizza);
    const guestsResponse = await fetch(PARTY_GUEST_URL);
    const { party } = await guestsResponse.json();
    setUsers(party);
    setPaidArray([]);
    pizza && guests && setLoading(false);
  };
//@ts-ignore
  const partPrice = pizza.price / parts || 0;

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
  return (
    <div>
      {/* create Load party btn */} 
      <button className={classes.loadBtn} onClick={handleOnClick}>
        Load party
      </button>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {!!guests.length && (
            <>
              {/* create pizza slicer */}
              <div className={classes.wrapperPizza}>
                {pizzaLovers.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        transform: `rotate(${index * angle}deg)`
                      }}
                    ></div>
                  );
                })}
              </div>
              <div style={{ margin: "20px" }}>
                There are {users.length} people at the party
              </div>
              <div style={{ margin: "20px" }}>
                There are {pizzaLovers.length} pizza eaters at the party
              </div>
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
                              // create colums "Name"
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

                              // create colums "Share to pay"
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
                          !loading && {
                            name: "Total order",
                            //@ts-ignore
                            price: <p> {roundPrice(pizza.price) || 0} BYN</p>,
                            key: "total"
                          },

                          // add "Money to collect"
                          !loading && {
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
                          !loading && {
                            name: "Money collected",
                            price: (
                              <p>
                                {roundPrice(partPrice * paidArray.length)} BYN
                              </p>
                            ),
                            key: "collected"
                          }
                        ]
                      : [{ name: "", price: "", button: "", key: "1" }]
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
