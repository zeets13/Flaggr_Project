export default function SidebarButton({

    icon,
    title

}) {

    return (

        <button

            className="
            flex
            items-center
            gap-4
            rounded-xl
            px-4
            py-3
            text-gray-300
            hover:bg-white/10
            hover:text-white
            transition
            "

        >

            {icon}

            <span>

                {title}

            </span>

        </button>

    );

}