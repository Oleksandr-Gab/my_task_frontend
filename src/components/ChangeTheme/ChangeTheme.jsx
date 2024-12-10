import { useDispatch, useSelector } from "react-redux";

import { editThema } from "../../redux/thema/operations.js";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../providers/ThemeProvider.jsx";
import { selectUserThema } from "../../redux/thema/selectors.js";

import css from "./ChangeTheme.module.css"

export default function ChangeTheme () {
    const dispatch = useDispatch();
    const userThema = useSelector(selectUserThema);
    const [thema, setThema] = useContext(ThemeContext);

    useEffect(() => {
        setThema(userThema)
    }, [userThema])

    const updateThema = async (e) => {
        setThema(e);
        try {
            await dispatch(editThema({"thema": e}));
        } catch (error) {
            console.log(error);
        }
        
    }
    

    return (
        <select defaultValue={userThema} onChange={e => updateThema(e.target.value)} className={css.selectes}>
        <option className={css.select} value="light">Light</option>
        <option className={css.select} value="dark">Dark</option>
        <option className={css.select} value="violet">Violet</option>
      </select>
    )
}