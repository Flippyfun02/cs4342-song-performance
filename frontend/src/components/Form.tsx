import {TextInput, Button, Group, Text, Select, Slider, NumberInput, SimpleGrid, Card, Title, Center} from "@mantine/core"
import {useState} from "react"
import {isNotEmpty, useForm} from "@mantine/form"

type Song = {
    duration_ms : number,
    explicit : boolean,
    af_danceability : number,
    af_energy : number,
    af_key : number,
    af_loudness : number,
    af_mode : number,
    af_speechiness : number,
    af_acousticness : number,
    af_instrumentalness : number,
    af_liveness : number,
    af_valence : number,
    af_tempo : number,
    af_time_signature : number,
}

const afFields = [
    {
        name: "af_danceability",
        label: "Danceability",
        description: "How suitable the song is for dancing",
        min: 0,
        max: 1,
        step: 0.01,
    },
    {
        name: "af_energy",
        label: "Energy",
        description: "Perceived intensity and activity of the song",
        min: 0,
        max: 1,
        step: 0.01,
    },
    {
        name: "af_loudness",
        label: "Loudness",
        description: "Overall loudness of the song",
        min: -60,
        max: 0,
        step: 1,
    },
    {
        name: "af_speechiness",
        label: "Speechiness",
        description: "Amount of spoken words in the song",
        min: 0,
        max: 1,
        step: 0.01,
    },
    {
        name: "af_acousticness",
        label: "Acousticness",
        description: "Likelihood the song is acoustically performed",
        min: 0,
        max: 1,
        step: 0.01,
    },
    {
        name: "af_instrumentalness",
        label: "Instrumentalness",
        description: "Likelihood the song contains no vocals",
        min: 0,
        max: 1,
        step: 0.01,
    },
    {
        name: "af_liveness",
        label: "Liveness",
        description: "Likelihood the recording was performed live",
        min: 0,
        max: 1,
        step: 0.01,
    },
    {
        name: "af_valence",
        label: "Valence",
        description: "Musical positivity or negativity",
        min: 0,
        max: 1,
        step: 0.01,
    },
] as const;

export default function SongForm () {
    const form = useForm<Song> ({
        mode: "controlled",
        initialValues: {
            duration_ms : 0,
            explicit : false,
            af_danceability : 0,
            af_energy : 0,
            af_key : 0,
            af_loudness : 0,
            af_mode : 0,
            af_speechiness : 0,
            af_acousticness : 0,
            af_instrumentalness : 0,
            af_liveness : 0,
            af_valence : 0,
            af_tempo : 0,
            af_time_signature : 3,
        },
        validate: {
            duration_ms : isNotEmpty(),
            af_danceability : isNotEmpty(),
            af_energy : isNotEmpty(),
            af_key : isNotEmpty(),
            af_loudness : isNotEmpty(),
            af_mode : isNotEmpty(),
            af_speechiness : isNotEmpty(),
            af_acousticness : isNotEmpty(),
            af_instrumentalness : isNotEmpty(),
            af_liveness : isNotEmpty(),
            af_valence : isNotEmpty(),
            af_tempo : isNotEmpty(),
            af_time_signature : isNotEmpty(),
        }
    });

    const handleSubmit = async (values: Song) => {
        const res = await fetch("http://localhost:8000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <Center>
            <Card padding="xl" w="75%">
                <Title>Song Performance Predictor</Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <SimpleGrid cols={2}>
                        <NumberInput
                            label="Duration"
                            description="Song length in milliseconds"
                            min={0}
                            {...form.getInputProps("duration_ms")}
                            onChange={(value) =>
                                form.setFieldValue("duration_ms", Number(value))
                            }
                        />
                        <Select
                            label="Rating"
                            description="Whether the song contains explicit content"
                            data={[
                                { value: "true", label: "Explicit" },
                                { value: "false", label: "Non-Explicit" },
                            ]}
                            value={String(form.values.explicit)}
                            onChange={(value) =>
                                form.setFieldValue("explicit", value === "true")
                            }
                        />
                        <NumberInput
                            label="Tempo"
                            description="The tempo of the track in beats per minute (BPM)."
                            min={0}
                            {...form.getInputProps("af_tempo")}
                            onChange={(value) =>
                                form.setFieldValue("af_tempo", Number(value))
                            }
                        />
                        <Select
                            label="Mode"
                            description="Whether the song is in a major or minor key"
                            data={[
                                { value: 1, label: 'Major' },
                                { value: 0, label: 'Minor' },
                            ]}
                            {...form.getInputProps("af_mode")}
                            onChange={(value) =>
                                form.setFieldValue("af_mode", Number(value))
                            }
                        />
                        <Select
                            label="Time Signature"
                            description="Number of beats per musical measure"
                            data={[
                                { value: "3", label: "3/4" },
                                { value: "4", label: "4/4" },
                                { value: "5", label: "5/4" },
                                { value: "6", label: "6/8" },
                                { value: "7", label: "7/4" },
                            ]}
                            {...form.getInputProps("af_time_signature")}
                            onChange={(value) =>
                                form.setFieldValue("af_time_signature", Number(value))
                            }
                        />
                        <Select
                            label="Key"
                            description="Musical key of the song"
                            data={[
                                { value: "0", label: "C" },
                                { value: "1", label: "C♯ / D♭" },
                                { value: "2", label: "D" },
                                { value: "3", label: "D♯ / E♭" },
                                { value: "4", label: "E" },
                                { value: "5", label: "F" },
                                { value: "6", label: "F♯ / G♭" },
                                { value: "7", label: "G" },
                                { value: "8", label: "G♯ / A♭" },
                                { value: "9", label: "A" },
                                { value: "10", label: "A♯ / B♭" },
                                { value: "11", label: "B" },
                            ]}
                            {...form.getInputProps("af_key")}
                            onChange={(value) =>
                                form.setFieldValue("af_key", Number(value))
                            }
                        />
                        {afFields.map((field) => (
                            <Group key={field.name}>
                                <NumberInput
                                    label={field.label}
                                    description={field.description}
                                    min={field.min}
                                    max={field.max}
                                    step={field.step}
                                    decimalScale={2}
                                    {...form.getInputProps(field.name)}
                                    w="30%"
                                    onChange={(value) =>
                                        form.setFieldValue(field.name, Number(value))
                                    }
                                />
                                <Slider
                                    color="green"
                                    min={field.min}
                                    max={field.max}
                                    step={field.step}
                                    label={(value) => `${Number((value * 100).toFixed(2))}%`}
                                    {...form.getInputProps(field.name)}
                                    onChange={(value) =>
                                        form.setFieldValue(field.name, Number(value))
                                    }
                                    flex={1}
                                />
                            </Group>
                        ))}
                    </SimpleGrid>
                    <Center>
                        <Button color="green" type="submit" mt="xl">
                            Predict!
                        </Button>
                    </Center>
                </form>
            </Card>
        </Center>

    )
}