import { Card } from 'primereact/card';
import { Button } from "primereact/button"
import { MovieType } from '../service';
import lodash from "lodash"


export default function MovieCard(props: MovieType & { doSomething: (p: MovieType) => void }) {
    const header = (
        <img alt="Card" style={{ maxHeight: 300, minHeight: 300 }} src={props.Poster} />
    );

    const footer = (
        <>
            <Button onClick={() => {
                const { doSomething, ...restOfProps } = props
                props.doSomething(restOfProps)
            }} label="Favorite" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    return (
        <div className="card flex justify-content-center" style={{ width: "20%" }}>
            <Card title={props.Title} subTitle={props.Year} footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
                    {props.imdbID}
                </p>
            </Card>
        </div>
    )
}


