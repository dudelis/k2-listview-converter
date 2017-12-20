using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace K2Field.Controls.ListViewConverter.Export
{
    internal class ExcelFormatFactory : IExportFormatFactory
    {
        public IExportFormat Export(DataTable dt)
        {
            return new ExcelFormat();
        }
    }
}
