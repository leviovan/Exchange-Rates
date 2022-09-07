import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfoLoc, fetchRates } from "../../redux/ratesSlice";
import { AppDispatch, RootState } from "../../redux/store";
import style from "./Home.module.scss";
const Home = () => {
  const [keys, setkeys] = useState<string[]>([]);
  const [valueFrom, setValueFrom] = useState<number>(0);
  const [valueTo, setValueTo] = useState<number>(0);
  const [ratesfrom, setRatesfrom] = useState<string>("");
  const [ratesTo, setRatesTo] = useState<string>("");

  const { items, isLoading, currencyDefault } = useSelector(
    (state: RootState) => state.rates
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchRate = () => {
      dispatch(fetchRates());
      dispatch(fetchInfoLoc());
    };
    fetchRate();
  }, []);

  useEffect(() => {
    setkeys(Object.keys(items));
  }, [isLoading]);

  useEffect(() => {
    setValueTo((+valueFrom / items[ratesfrom]) * items[ratesTo]);
  }, [valueFrom, ratesfrom, ratesTo, valueTo]);

  return isLoading ? (
    <div className={style.container}>
      <form className={style.from}>
        <h1 className={style.title}>Exchange Rates</h1>
        <div className={style.blockInput}>
          <input
            className={style.input}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              e.currentTarget.value.length < 15 &&
                setValueFrom(+e.currentTarget?.value);
            }}
            value={!isNaN(valueFrom) ? valueFrom : 0}
            type="text"
          />
          <select
            className={style.select}
            onChange={(e) => {
              setRatesfrom(e.target.value);
            }}
            name="fromRates"
          >
            <option
              className={style.option}
              key={`key_default`}
              value={ratesfrom}
            >
              {ratesfrom}
            </option>
            {keys &&
              keys.map((key: string, index) => (
                <option
                  selected={currencyDefault === key}
                  className={style.option}
                  key={`${key}_1`}
                  value={key}
                >
                  {`${key}`}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div className={style.blockInput}>
          <input
            className={style.input}
            readOnly
            value={!isNaN(valueTo) ? valueTo.toFixed(2) : 0}
            type="text"
          />
          <select
            className={style.select}
            onChange={(e) => {
              setRatesTo(e.target.value);
            }}
            name="toRates "
          >
            {keys &&
              keys.map((key: string, index) => (
                <option
                  selected={"USD" === key}
                  className={style.option}
                  key={`${key}_2`}
                  value={key}
                >
                  {key}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Home;
