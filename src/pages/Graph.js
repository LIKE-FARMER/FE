import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {PureComponent} from 'react';

const data = [
    {
        name: "8/1",
        방문자수: 4,
        글작성횟수: 2,
    },
    {
        name: "8/2",
        방문자수: 1,
        글작성횟수: 3,
    },
    {
        name: "8/3",
        방문자수: 10,
        글작성횟수: 7,
    },
    {
        name: "8/4",
        방문자수: 2,
        글작성횟수: 3,
    },
    {
        name: "8/5",
        방문자수: 1,
        글작성횟수: 4,
    },
    {
        name: "8/6",
        방문자수: 2,
        글작성횟수: 3,
    },
    {
        name: "8/7",
        방문자수: 3,
        글작성횟수: 4,
    },
];

class Graph extends PureComponent{
    static y = [5,10,15,20];
    static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";
    render() {
        return (
            <ResponsiveContainer width="100%" height={260}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis  domain={[0, 'auto']}/>
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="글작성횟수"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="방문자수" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
export default Graph;