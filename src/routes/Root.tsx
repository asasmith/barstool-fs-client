import { Link, Outlet } from 'react-router-dom';

export function Root() {
    return (
        <div className="max-w-screen-lg flex justify-between mx-auto">
            <nav>
                <ul className="flex flex-col h-full justify-center">
                    <li>
                        <Link to={`boxscore/6o974274-4bfc-4af8-a9c4-8b926637ba74`} key='6o974274-4bfc-4af8-a9c4-8b926637ba74'>OKC v MIA</Link>
                    </li>
                    <li>
                        <Link to={`boxscore/eed38457-db28-4658-ae4f-4d4d38e9e212`} key='eed38457-db28-4658-ae4f-4d4d38e9e212'>SEA v LAA</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex flex-col items-center">
                <Outlet />
            </div>
        </div>
    );
}
