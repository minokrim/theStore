import {render,screen} from "@testing-library/react";
import { setupServer } from 'msw/node'
import {rest} from 'msw';
import { MemoryRouter } from "react-router-dom";
import Home from "./home";


const rendered=[
    rest.get("https://api.escuelajs.co/api/v1/products",(req,res,ctx)=>{

        return res(
            ctx.json({
                items:[
                    {id:1,title:"cloth1",price:"price1",description:"description1"},
                    {id:2,title:"cloth2",price:"price2",description:"description2"}

                ]
            })
        )
    })
]

const server=setupServer(...rendered)

beforeAll(()=>{
    server.listen()
})

afterEach(()=>{
    server.resetHandlers();
})
afterAll(()=>{
    server.close();
})

test ("renders product for ecoomerce page",async()=>{
    render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    )

    screen.debug();
})