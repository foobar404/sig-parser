import React,{useEffect} from 'react'
import {mix} from "../util"
import styled,{css} from "styled-components"
import {themeGet} from "@styled-system/theme-get"
import {useField} from "react-form";


const Style = styled.div`
    ${mix.hw("48px",["100%","100%","300px"])}
    ${mix.row("flex-start","stretch")}
    ${mix.m(4,0)}
    ${mix.children([css`
        ${mix.hw("50%",[3,3,"20px"])}
        align-self:center;
    `])}
    ${mix.stretch()}

    input:hover + pre{
        display:none;
    }

    pre{
        ${mix.pos("bottom","left")}
        ${mix.p(4,5)}
      
        background:#fff;
        border-radius:0 15px 15px 15px;
        border:2px solid ${themeGet("colors.error.main")};
        transform:none;
    }

    border:2px solid #eee;
    border-radius:5px;
    background:hsl(0deg 0% 96%);

`

export function Input({children,validate,onChange,defaultValue="",...rest}) {
    let {value, form, meta:{error}, getInputProps} = useField(rest.name,{validate,defaultValue})

    useEffect(()=>{
        if(onChange)
            onChange(value,form)
    },[value])
    
    return (
        <Style {...{...rest}}>
            {children}
            <input {...{...rest}} {...getInputProps()} />
            <pre hidden={!error}><p error="">{error}</p></pre>
        </Style>
    )
}
