import React, { type ReactNode } from "react";
import NotesIcon from "../assets/notes_icon.png";

interface LayoutProps {
    children: ReactNode;
}
interface Card extends React.FC<LayoutProps> {
    Header: React.FC;
}

const CardContainer: React.FC<LayoutProps> = ({ children }) => {
    return <div className="sm:w-[509px] w-full min-w-[320px] h-[496px] overflow-hidden bg-white rounded-xl shadow-md border border-gray-300">{children}</div>;
};

// can be made more dynamic and reusable
const CardHeader: React.FC = () => {
    return (
        <div className="flex items-center px-6 py-4">
            <img src={NotesIcon} alt="logo" className="size-14 -translate-x-2" />
            <h1 className="text-3xl font-bold ml-0 translate-y-1">Note App</h1>
        </div>
    );
};

const Card = CardContainer as Card;
Card.Header = CardHeader;

export default Card;
