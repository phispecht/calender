import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Get_Movies() {
    const [color, setColor] = useState("lightcyan");

    const Objectdays = {
        january: 31,
        february: 28,
        march: 31,
        april: 30,
        may: 31,
        june: 30,
        july: 31,
        august: 31,
        september: 30,
        october: 31,
        november: 30,
        december: 31
    }

    //////// end /////////////

    ///////// get calender data ///////////
    
    const days = Object.values(Objectdays)
    let daysData = [];

     for (const element of days) {
        for(let i = 1; i <= element; i++){
            daysData.push(<div tabIndex={i} className="day">{i}.</div>);
            if(i % 7 == 0){
                daysData.push(<br></br>);
            }
            if(i == element){
                daysData.push(<div className="space"></div>);
            }
        }
      } 

    console.log(daysData);

    useEffect(() => {
        
        axios
            .get(`getData`)
            .then((response) => {
                console.log(response.data[16]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const getID = () => {
        alert("day clicked");
         if(color == false){
            setColor("blue");
        }else{
            setColor("lightcyan");
        }
    }

    console.log(daysData);


    return (<div><h1>Calender 2021</h1>
    <div className="calender-days">
        <div onClick={() => getID()} className="months">
            {daysData &&
            daysData.map((element)=>(
                <>
                <div className="day" key={element.id}>
                {element}
                </div>
                </>
            ))}
            </div>
        </div>
    </div>)}
