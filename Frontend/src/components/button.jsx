export default function Button({string, funcao, product}){
    return(
        <div className="card-actions justify-end font-aldrich">
            <button className="btn btn-primary font-aldrich" onClick={() => { funcao(product) }}>
            {string}
            </button>
        </div>
    );
}