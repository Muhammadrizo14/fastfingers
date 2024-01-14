const popup = ({ children }: any) => {

    return (
        <div className='popup'>
            <div className='popupContent'>
                {children}
            </div>
        </div>
    );
}

export default popup;