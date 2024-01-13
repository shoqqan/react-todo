import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const Editable = React.memo(function (props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span className={'text-lg font-bold'} onDoubleClick={activateEditMode}>{title}</span>
});