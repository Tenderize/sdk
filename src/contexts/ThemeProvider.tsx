import { Theme } from "@radix-ui/themes"
import { FC } from "react"

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) =>
    <Theme
        accentColor="blue"
        grayColor="olive"
        panelBackground="solid"
        scaling="100%"
        radius="large"
    >{children}</Theme>
