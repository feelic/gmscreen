import React from "react";
import styles from "./CharacterForm.module.css";

export default function CharacterForm(props) {
  const {character= {}, actions} = props;
  const submitAction = character.id && actions.update || actions.create;
  const submitLabel =  character.id && 'update' || 'create';

  return (
    <div>
      <input type="text" value={character.name} />
      <button onClick={() => submitAction()} value={submitLabel}/>
    </div>
  );
}
