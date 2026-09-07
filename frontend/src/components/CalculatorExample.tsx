import {TextInput, Button, Group, Text, Select} from "@mantine/core"
import {useState} from "react";

type Operation = "add" | "subtract" | "multiply" | "divide";

export default function Calculator() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [operation, setOperation] = useState<Operation>("add");
    const [result, setResult] = useState<number | null>(null);

    const calculate = async () => {
        const res = await fetch("http://localhost:8000/calculate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({a, b, operation}),
        });
        const data = await res.json();
        setResult(data.result);
    };

    return (
        <Group gap="xs">
            <TextInput
                type="number"
                onChange={e => setA(Number(e.target.value))}
            ></TextInput>
            <Select
                placeholder="Pick an Operation"
                data={[
                    {value: "add", label: "+"},
                    {value: "subtract", label: "-"},
                    {value: "multiply", label: "*"},
                    {value: "divide", label: "/"},
                ]}
                value={operation}
                onChange={(value) => setOperation(value as Operation)}
            />
            <TextInput
                type="number"
                onChange={e => setB(Number(e.target.value))}
            ></TextInput>
            <Button onClick={calculate}>Calculate</Button>
            {result !== null && <Text>Result: {result}</Text>}
            {/*<input type="number" onChange={e => setA(Number(e.target.value))}/>*/}
            {/*<select onChange={e => setOperation(e.target.value as Operation)}>*/}
            {/*    <option value="add">+</option>*/}
            {/*    <option value="subtract">-</option>*/}
            {/*    <option value="multiply">×</option>*/}
            {/*    <option value="divide">÷</option>*/}
            {/*</select>*/}
            {/*<input type="number" onChange={e => setB(Number(e.target.value))}/>*/}
            {/*<button onClick={calculate}>=</button>*/}
            {/*{result !== null && <p>Result: {result}</p>}*/}
        </Group>
    )
}