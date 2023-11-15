import { error, log } from 'console'
import express, {NextFunction, Request, Response} from 'express'
const app = express()

// router
const userRouter = express.Router()
const courseRouter = express.Router()

// parser
app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/courses', courseRouter)

// middleware
const logger = (req: Request, res: Response, next: NextFunction) =>{
    next()
}




userRouter.post('/create-user', (req: Request, res: Response)=> {
    const user = req.body
    console.log(user)
    res.json({
        success: true,
        message: "User is created successfully",
        data: user
    })
})

courseRouter.post('/create-course', (req: Request, res: Response) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course created successfully",
        data: course
    })
    
}
)


app.get('/',logger, (req: Request, res: Response, next: NextFunction) => {
    
    try {
        res.send("Hello")
    } catch (error) {
        next(error)
    }
})

app.post('/', logger, (req: Request, res: Response)=> {
    console.log(req.body);
    res.send('Got data')
})

// Error: If route not found
app.all('*', (req: Request, res:Response)=> {
    res.status(400).json({
        success: false,
        message: "Route not found"
    })
})


// Global error handling
app.use((error: any, req: Request, res: Response, next: NextFunction)=> {
    console.log(error);
    if(error){
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
    
})

export default app;
