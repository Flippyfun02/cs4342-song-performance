import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core"
import Calculator from "./components/CalculatorExample.tsx";
import Form from "./components/Form.tsx"

export default function App() {
    return (
        <MantineProvider>
            <Form/>
        </MantineProvider>
    );
}