import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core"
import Calculator from "./components/CalculatorExample.tsx";

export default function App() {
    return (
        <MantineProvider>
            <Calculator/>
        </MantineProvider>
    );
}