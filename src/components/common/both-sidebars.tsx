import { cn } from "@/lib/utils";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
import {
  isRightBarHide,
  toggleRightSidebar,
} from "@/features/right-sidebar-slice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toggleLeftSidebar } from "@/features/left-sidebar-slice";

const BothSidebars = () => {
  const dispatch = useAppDispatch();

  const { isLeftBarHide } = useAppSelector((state) => state.leftSide);
  const isLeftOpen = useAppSelector((state) => state.leftSide.isLeftBarHide);
  const isRightOpen = useAppSelector((state) => state.rightSide.isRightBarHide);

  const isRight = useAppSelector(isRightBarHide);

  return (
    <>
      <div
        className={cn(
          `transition-all duration-300 ease-in-out`,
          isLeftBarHide ? "w-[400px]" : "w-0 overflow-hidden opacity-0"
        )}
      >
        <LeftSidebar />
      </div>

      <div className="w-full relative my-1 border bg-white  rounded-2xl">
        <div
          className="absolute w-6 h-6 bg-white border cursor-pointer flex items-center justify-center rounded-full z-20 left-[-12px] top-15"
          onClick={() => dispatch(toggleLeftSidebar())}
        >
          <ChevronLeft
            className={cn(
              "transition-all duration-300",
              isLeftOpen ? "" : "rotate-180"
            )}
          />
        </div>

        <Outlet />

        <div
          className="absolute w-6 h-6 bg-white border cursor-pointer flex items-center justify-center rounded-full z-20 right-[-12px] top-15"
          onClick={() => dispatch(toggleRightSidebar())}
        >
          {" "}
          <ChevronRight
            className={cn(
              "transition-all duration-300",
              isRightOpen ? "" : "rotate-180"
            )}
          />{" "}
        </div>
      </div>

      <div
        className={cn(
          `transition-all duration-300 ease-in-out overflow-hidden opacity-0`,
          isRight ? "w-[400px] opacity-100" : "w-0"
        )}
      >
        <RightSidebar />
      </div>
    </>
  );
};

export default BothSidebars;
