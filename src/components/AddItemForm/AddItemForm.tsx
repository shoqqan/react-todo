import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

interface AddItemFormPropsType {
    addItem: (title: string) => void
    placeholder?: string
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div className={'flex flex-col gap-1'}>
        <div className={'flex gap-x-5 items-center'}>
            <input type="text" value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                   className={'px-4 py-2 rounded-2xl border'} placeholder={props.placeholder ? props.placeholder : ""}/>
            <button
                className={'flex px-4 py-2 justify-center items-center text-amber-50 bg-[#2383e2] text-sm border-1 shadow-lg rounded-lg transition-all hover:bg-[#0077d4]'}
                onClick={addItem}>
                New
            </button>
        </div>
        {error && <p className={'text-red-600 font-medium mb-2'}>{error}</p>}
    </div>
})