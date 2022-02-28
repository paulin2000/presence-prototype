import { useEffect, useState } from "react";

interface Props {
  id: number;
  data: any;
  setMoisList: React.Dispatch<React.SetStateAction<boolean>>;
}
interface objet {
  mois: string;
  jour: string;
  heureArrive: string;
  heureDepart: string;
  dayhour: string;
}
const MoisList = (props: Props) => {
  let [Categories, setCategories] = useState<Array<string>>([]);
  const [cumul, setCumul] = useState<string>("");

  const HourMinutesFormat = (ms: string): string => {
    const msi = parseInt(ms);
    const hours = Math.floor(msi / (60 * 60 * 1000));
    const hoursms = msi % Math.floor(60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    return hours + "h : " + minutes + "m";
  };
  const hourCumul = () => {
    const cumulms = props.data.reduce((p: number, c: objet) => {
      return p + c.dayhour;
    }, 0);
    return HourMinutesFormat(cumulms);
  };

  useEffect(() => {
    if (props.data !== []) {
      setCumul(hourCumul);
      const temp: string[] = props.data.map((element: objet) => {
        return element.mois;
      });
      const cat = Array.from(new Set(temp));
      setCategories([...cat]);
    }
  }, [props.data]);

  return (
    <div className="mois-container" >
      {
        <div className="mois-list" >
          <button
            className="btn btn-secondary close"
            onClick={() => props.setMoisList(false)}
          >
            Fermer
          </button>
          {Categories !== [] &&
            Categories.map((element, index) => {
              return (
                <div className={`mois ${element}`}  key={index}>
                  <h1 className="sau" onBlur={()=>{props.setMoisList(false)}}>{element}</h1>

                  <ul>
                    {props.data !== [] &&
                      props.data.map((elmt: objet, ind: number) => {
                        if (elmt.mois === element) {
                          return (
                            <li key={ind}>
                              <div>
                                <span>Le {elmt.jour}</span>
                                <span>{elmt.heureArrive}</span>-
                                <span>{elmt.heureDepart}</span>
                                <span>
                                  Durée: {HourMinutesFormat(elmt.dayhour)}
                                </span>
                              </div>
                            </li>
                          );
                        }
                      })}
                  </ul>
                  <div id="somme">
                    Heures Cumuléées: {cumul}
                  </div>
                </div>
              );
            })}
            
        </div>
      }
    </div>
  );
};

export default MoisList;
