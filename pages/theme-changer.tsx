import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Layout } from '../components/layouts'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next'
import axios from 'axios';


interface Props {
    theme: string,

}

const ThemeChangerPage: FC<Props> = ({ theme }) => {

    const [currentTheme, setCurrentTheme] = useState(theme)
    let themeSelected = currentTheme
    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        themeSelected = event.target.value
        setCurrentTheme(themeSelected)
        localStorage.setItem("theme", themeSelected)

        Cookies.set('theme', themeSelected)
    }
    const onClick = async () => {
        const { data } = await axios.get('api/hello')
        console.log({ data })
    }

    useEffect(() => {
        Cookies.get('theme')
    }, [])

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>
                            Tema
                        </FormLabel>
                        <RadioGroup value={currentTheme} onChange={onThemeChange}>
                            <FormControlLabel value='light' control={<Radio />} label='Light' />
                            <FormControlLabel value='dark' control={<Radio />} label='Dark' />
                            <FormControlLabel value='custom' control={<Radio />} label='Custom' />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={onClick}
                    >
                        Solicitud
                    </Button>
                </CardContent>
            </Card>
        </Layout>
    )
}




export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { theme = 'light', name = 'no-name' } = req.cookies

    const validThemes = ['light', 'dark', 'custom']
    return {
        props: {
            theme: validThemes.includes(theme) ? theme : 'dark',
            name
        }
    }
}
export default ThemeChangerPage