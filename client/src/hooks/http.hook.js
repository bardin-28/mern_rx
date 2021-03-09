import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom';

export const useHttp = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory();

    const request = useCallback(async (url, method = 'GET', body = null, headers = {
      'Access-Control-Allow-Origin': '*'
    }) =>{

        setLoading(true)

        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                headers['Access-Control-Allow-Origin'] = '*'
            }

            const response = await fetch(url,{method, body, headers}).then((res) =>{
                if (res.status === 401 ){
                    localStorage.clear()
                    history.push('/login')
                    alert('Ваша сессия закончилась, пожалуйста перезайдите.')
                }

                const data = res.json()



                if(!res.ok){
                    throw new Error(data.message || 'Не верный логин или пароль')
                }

                setLoading(false)

                return data
            })
            return response

        }catch (e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}
